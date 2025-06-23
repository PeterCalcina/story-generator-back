import { GenerateStoryDto } from 'src/generate-story/dto/generate-story.dto';

export const promptGemini = ({ description, style }: GenerateStoryDto) => {
  return `A partir de la imagen proporcionada y la siguiente descripción: '${description}', escribe una historia corta 
  en español de aproximadamente 500 palabras. La historia debe ser creativa, emocional y con un tono narrativo envolvente, incluyendo un inicio, un desarrollo y un final claro.
  Debe tener un título separado del contenido por la línea '===' (por ejemplo: "Título de la historia === Contenido").

Además, genera una ilustración altamente detallada y profesional en estilo artístico ${style}.
⚠️ La nueva imagen debe ser una versión estilizada de la original, **sin alterar ni remover ningún elemento visual existente**.
Solo se permiten mejoras visuales: mayor nivel de detalle, refinamiento de líneas, sombreado artístico, y ajustes en la paleta de colores que se alineen con el estilo ${style}.
No cambies la composición, no inventes nuevos objetos, no reinterpretes la escena. **Respeta por completo la estructura, posición y contenido visual original**.`;
};
