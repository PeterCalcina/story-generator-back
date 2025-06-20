import { Injectable } from '@nestjs/common';
import { SupabaseStorageService, GeminiAiService } from './services';
import { PrismaService } from 'src/prisma/prisma.service';
import { generatePdfBuffer } from 'src/utils/pdf-generator.util';

@Injectable()
export class GenerateStoryService {
  constructor(
    private readonly supabaseStorageService: SupabaseStorageService,
    private readonly geminiAiService: GeminiAiService,
    private readonly prisma: PrismaService,
  ) {}

  async generateImage(
    image: Express.Multer.File,
    description: string,
    phone: string,
  ): Promise<{ story: string; imageCreated: string }> {
    const imageUploadOriginal =
      await this.supabaseStorageService.uploadImage(image);
    const { story, imageCreated } =
      await this.geminiAiService.generateStoryAndImage(image, description);
    const imageUploadCreated =
      await this.supabaseStorageService.uploadImage(imageCreated);
    const pdfBuffer  = await generatePdfBuffer('Historia generada',story, imageCreated);
    const pdfUrl = await this.supabaseStorageService.uploadPdf(pdfBuffer);

    await this.saveStory({
      originalImage: imageUploadOriginal,
      createdImage: imageUploadCreated,
      pdfUrl: pdfUrl,
      story,
      phoneNumber: phone,
    });

    return { story, imageCreated: imageUploadCreated };
  }

  private async saveStory(data: {
    originalImage: string;
    createdImage: string;
    pdfUrl: string;
    story: string;
    phoneNumber: string;
  }) {
    try {
      await this.prisma.imageStory.create({
        data,
      });
    } catch (error) {
      throw new Error(`Error al guardar la historia: ${error.message}`);
    }
  }

  async getStories(phone: string) {
    return await this.prisma.imageStory.findMany({
      where: {
        phoneNumber: {
          equals: phone,
        },
      },
    });
  }
}
