import { Request } from 'express';

export const imageFileFilter = (req: Request, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    callback(null, true);
  } else {
    callback(
      new Error('Sólo se permiten archivos de tipo JPG, JPEG o PNG'),
      false,
    );
  }
};
