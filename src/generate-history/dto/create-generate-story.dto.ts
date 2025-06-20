import { IsString } from 'class-validator';

export class CreateGenerateStoryDto {
  @IsString()
  description: string;
} 