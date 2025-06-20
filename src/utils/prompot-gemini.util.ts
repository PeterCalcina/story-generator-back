export const promptGemini = (prompt: string) => {
  return `A partir de la imagen proporcionada y la siguiente descripción: '${prompt}', escribe una historia corta de 
  aproximadamente 200 palabras. La historia debe ser creativa, emocional y con un tono narrativo envolvente.
  La historia debe tener un título, el contenido debe estar separado del titulo por '==='.
  Además, genera una ilustración muy detallada y profesional. La ilustración debe mantener la esencia lúdica del original, 
  pero con detalles mejorados, líneas refinadas y una paleta de colores vibrante. Considera agregar profundidad y textura para darle 
  un toque artístico y pulido.`;
};