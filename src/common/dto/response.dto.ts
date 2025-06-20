import { IsNumber, IsString, IsOptional, IsObject } from 'class-validator';

export class StandardResponse<T> {
  @IsNumber()
  status: number; // Status code HTTP (200, 400, 500, etc.)

  @IsString()
  message: string;

  @IsOptional()
  data?: T; // Optional data field for successful responses

  @IsOptional()
  @IsObject()
  error?: {
    message: string;
    details?: string[] | Record<string, unknown>;
  }; // Optional error field for failed responses
}
