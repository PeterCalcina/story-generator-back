export interface ImageUploadResult {
  fullPath: string;
  url: string;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface StoryGenerationRequest {
  image: Express.Multer.File;
  description: string;
  phone: string;
}

export interface StoryGenerationResult {
  story: string;
  imageUrl: string;
}

export interface SupabaseUploadResult {
  data: {
    path: string;
  } | null;
  error: {
    message: string;
  } | null;
}
