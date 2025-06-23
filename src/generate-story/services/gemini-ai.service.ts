import { Injectable } from '@nestjs/common';
import { getEnvironmentConfig } from 'src/common/config/environment.config';
import { promptGemini } from 'src/utils/prompot-gemini.util';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiAiService {
  private readonly config = getEnvironmentConfig();
  private ai = new GoogleGenAI({
    apiKey: this.config.gemini.apiKey,
  });

  async generateStoryAndImage(
    image: Express.Multer.File,
    prompt: string,
  ): Promise<{
    title: string;
    content: string;
    imageCreated: Express.Multer.File;
  }> {
    const base64Image = image.buffer.toString('base64');
    const description = promptGemini(prompt);

    const contents = [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: image.mimetype,
            },
          },
          {
            text: description,
          },
        ],
      },
    ];

    const config = {
      responseModalities: ['IMAGE', 'TEXT'],
      responseMimeType: 'text/plain',
    };

    const response = await this.ai.models.generateContentStream({
      model: 'gemini-2.0-flash-preview-image-generation',
      config,
      contents,
    });

    let story = '';
    let imageCreated: Express.Multer.File | null = null;

    for await (const chunk of response) {
      const parts = chunk?.candidates?.[0]?.content?.parts;
      if (!parts) continue;

      for (const part of parts) {
        if (part.inlineData && !imageCreated) {
          imageCreated = {
            buffer: Buffer.from(part.inlineData.data || '', 'base64'),
            mimetype: part.inlineData.mimeType || 'image/png',
          } as Express.Multer.File;
        } else if (part.text) {
          story += part.text;
        }
      }
      if (story && imageCreated) break;
    }

    if (!imageCreated) throw new Error('Gemini no generó ninguna imagen');

    const title = story.split('===')[0];
    const content = story.split('===')[1];

    return { title, content, imageCreated };
  }
}
