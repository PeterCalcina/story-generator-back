import { Injectable } from '@nestjs/common';
import { SupabaseStorageService, GeminiAiService } from './services';
import { PrismaService } from 'src/prisma/prisma.service';
import { generatePdfBuffer } from 'src/utils/pdf-generator.util';
import { CreateStoryDto } from './dto/create-story.dto';
import { GenerateStoryDto } from './dto/generate-story.dto';

@Injectable()
export class GenerateStoryService {
  constructor(
    private readonly supabaseStorage: SupabaseStorageService,
    private readonly geminiAiService: GeminiAiService,
    private readonly prisma: PrismaService,
  ) {}

  async generateStory(
    image: Express.Multer.File,
    generateStoryDto: GenerateStoryDto,
    phone: string,
  ): Promise<CreateStoryDto> {
    const imageUploadOriginal = await this.supabaseStorage.uploadImage(image);
    const { title, content, imageCreated } =
      await this.geminiAiService.generateStoryAndImage(image, generateStoryDto);
    const imageUploadCreated =
      await this.supabaseStorage.uploadImage(imageCreated);
    const pdfBuffer = await generatePdfBuffer(title, content, imageCreated);
    const pdfUrl = await this.supabaseStorage.uploadPdf(pdfBuffer);

    const story: CreateStoryDto = {
      originalImage: imageUploadOriginal,
      createdImage: imageUploadCreated,
      pdfUrl: pdfUrl,
      title: title,
      story: content,
      phoneNumber: phone,
    };

    await this.saveStory(story);

    return story;
  }

  private async saveStory(data: CreateStoryDto) {
    await this.prisma.imageStory.create({ data });
  }

  async getStories(phone: string) {
    return await this.prisma.imageStory.findMany({
      where: {
        phoneNumber: {
          equals: phone,
        },
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  }
}
