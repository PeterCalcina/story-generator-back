import { IsString } from 'class-validator';

export class GenerateStoryDto {
  @IsString()
  description: string;
  
  @IsString()
  style: string;
}
