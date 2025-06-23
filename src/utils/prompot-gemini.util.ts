import { GenerateStoryDto } from 'src/generate-story/dto/generate-story.dto';
import { stylePrompts } from 'src/generate-story/prompts/style-prompts';

export const promptGemini = ({ description, style }: GenerateStoryDto) => {
  const imageStyle = stylePrompts[style as keyof typeof stylePrompts];

  return `A partir de la imagen proporcionada y la siguiente descripción: '${description}', escribe una historia corta 
  en español de aproximadamente 500 palabras. La historia debe ser creativa, emocional y con un tono narrativo envolvente, incluyendo un inicio, un desarrollo y un final claro.
  Debe tener un título separado del contenido por la línea '===' (por ejemplo: "Título de la historia === Contenido").
  Además, genera una ilustración altamente detallada y profesional en estilo artístico ${imageStyle.label}.
  ${imageStyle.description}`;
};
