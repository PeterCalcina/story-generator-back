import { Controller, Post, UploadedFile, Body, UseInterceptors, HttpStatus, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenerateStoryDto } from './dto/generate-story.dto';
import { successResponse } from 'src/common/responses/success-response';
import { GenerateStoryService } from './generate-story.service';
import { User } from 'src/auth/user.decorator';
import { memoryStorage } from 'multer';
import { imageFileFilter } from 'src/common/filters/file-interceptor';

@Controller('generate-story')
export class GenerateStoryController {
  constructor(private readonly generateStoryService: GenerateStoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,  
    }),
  )
  async generarImagen(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: GenerateStoryDto,
    @User('phone') phone: string,
  ) {
    const response = await this.generateStoryService.generateStory(image, body.description, phone);
    return successResponse(response, 'Historia generada correctamente', HttpStatus.CREATED);
  }

  @Get()
  async getStories(@User('phone') phone: string) {
    const stories = await this.generateStoryService.getStories(phone);
    return successResponse(stories, 'Historias obtenidas correctamente', HttpStatus.OK);
  }
} 