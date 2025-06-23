import { Module } from '@nestjs/common';
import { GenerateStoryController } from './generate-story.controller';
import { GenerateStoryService } from './generate-story.service';
import { SupabaseStorageService, GeminiAiService } from './services';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GenerateStoryController],
  providers: [GenerateStoryService, SupabaseStorageService, GeminiAiService],
})
export class GenerateStoryModule {}
