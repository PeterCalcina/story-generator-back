import * as PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';

export const generatePdfBuffer = async (title: string, story: string, image: Express.Multer.File): Promise<Buffer> => {
  const imageBuffer = image.buffer;
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.fontSize(20).text(title, { align: 'center' }).moveDown();
    doc.image(imageBuffer, { fit: [500, 400], align: 'center' }).moveDown();
    doc.fontSize(12).text(story, { align: 'justify' });

    doc.end();
  });
};
