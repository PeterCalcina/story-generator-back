import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageUploadException extends HttpException {
  constructor(message: string) {
    super(`Error al subir la imagen: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class GeminiApiException extends HttpException {
  constructor(message: string) {
    super(`Error en la API de Gemini: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class InvalidGeminiResponseException extends HttpException {
  constructor() {
    super('No se recibió contenido válido de Gemini', HttpStatus.BAD_GATEWAY);
  }
}

export class StorySaveException extends HttpException {
  constructor(message: string) {
    super(`Error al guardar la historia: ${message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
} 