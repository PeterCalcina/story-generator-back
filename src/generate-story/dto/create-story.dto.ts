import { IsString } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  originalImage: string;

  @IsString()
  createdImage: string;

  @IsString()
  pdfUrl: string;

  @IsString()
  title: string;

  @IsString()
  story: string;

  @IsString()
  phoneNumber: string;
}
