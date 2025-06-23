import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseUploadResult } from 'src/common/types/image.types';
import { ImageUploadException } from 'src/common/exceptions/story-generation.exception';
import { getEnvironmentConfig } from 'src/common/config/environment.config';
import { STORAGE_CONSTANTS } from 'src/common/constants/storage.constants';

@Injectable()
export class SupabaseStorageService {
  private readonly supabase: SupabaseClient;
  private readonly config = getEnvironmentConfig();
  private readonly publicUrl: string;

  constructor() {
    this.supabase = createClient(
      this.config.supabase.url,
      this.config.supabase.serviceRoleKey,
    );
    this.publicUrl = `${this.config.supabase.url}/storage/v1/object/public`;
  }

  async uploadImage(image: Express.Multer.File): Promise<string> {
    const filePath = `${STORAGE_CONSTANTS.ORIGINALS_PATH}/${Date.now()}-${image.originalname}`;

    const { data, error }: SupabaseUploadResult = await this.supabase.storage
      .from(STORAGE_CONSTANTS.BUCKET_NAME)
      .upload(filePath, image.buffer, {
        contentType: image.mimetype,
        upsert: false,
      });

    if (error) {
      throw new ImageUploadException(error.message);
    }

    if (!data?.path) {
      throw new ImageUploadException(
        'No se recibió la ruta del archivo subido',
      );
    }
    const url = `${this.publicUrl}/${STORAGE_CONSTANTS.BUCKET_NAME}/${data.path}`;

    return url;
  }

  async uploadPdf(pdf: Buffer): Promise<string> {
    const filePath = `${STORAGE_CONSTANTS.PDFS_PATH}/story-${Date.now()}.pdf`;
    const { data, error }: SupabaseUploadResult = await this.supabase.storage
      .from(STORAGE_CONSTANTS.BUCKET_NAME)
      .upload(filePath, pdf, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (error) {
      throw new ImageUploadException(error.message);
    }

    if (!data?.path) {
      throw new ImageUploadException(
        'No se recibió la ruta del archivo subido',
      );
    }

    const url = `${this.publicUrl}/${STORAGE_CONSTANTS.BUCKET_NAME}/${data.path}`;

    return url;
  }
}
