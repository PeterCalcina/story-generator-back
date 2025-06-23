import { GenerateStoryDto } from 'src/generate-story/dto/generate-story.dto';
import { stylePrompts } from 'src/generate-story/prompts/style-prompts';

export const promptGemini = ({ description, style }: GenerateStoryDto) => {
  const imageStyle = stylePrompts[style as keyof typeof stylePrompts];

  return `Based on the provided image and the following description: '${description}', write a short story in **Spanish** of approximately 500 words.
  The story should be emotional and immersive, featuring a clear beginning, middle, and end. Include a compelling title, separated from the story content using '==='.

  Additionally, generate a highly detailed illustration in the '${imageStyle.label}' artistic style.
  The new image must be a faithful enhancement of the original — no visual elements should be altered, removed, or reinterpreted.
  Focus solely on visual improvements: refined lines, detailed textures, enhanced shading, and a color palette aligned with the '${imageStyle.label}' aesthetic.
  The composition, structure, and core visual content must remain intact. However, you may add stylistic flourishes or subtle artistic details to elevate the image's quality.
  
  ${imageStyle.description}`;
};
