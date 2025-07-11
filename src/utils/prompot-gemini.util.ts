import { GenerateStoryDto } from 'src/generate-story/dto/generate-story.dto';
import { stylePrompts } from 'src/generate-story/prompts/style-prompts';

export const promptGemini = ({ description, style }: GenerateStoryDto) => {
  const imageStyle = stylePrompts[style as keyof typeof stylePrompts];

  return `
  [INSTRUCTIONS FOR STORY]
  Based on the provided image and the following description: '${description}', write a short story in **Spanish** of approximately 500 words.
  The story should be emotional and immersive, featuring a clear beginning, middle, and end. Include a compelling title, separated from the story content using '==='.

  [INSTRUCTIONS FOR IMAGE]
  Take on the role of a highly skilled professional artist renowned for re-drawing existing images with impeccable precision. Your expertise lies in enhancing original artworks without altering any of their visual elements. You must preserve the entire composition exactly as it is, adding only extra details, textures, or stylistic nuances in the requested '${imageStyle.label}' artistic style to enrich the illustration. Under no circumstances should you remove, change, or reinterpret any part of the original image.

  Generate a highly detailed illustration in the '${imageStyle.label}' style, focusing solely on improving visual quality through refined lines, enhanced textures, subtle shading, and a color palette aligned with the '${imageStyle.label}' aesthetic.
  The composition, structure, and core visual content must remain completely intact.
  
  '${imageStyle.description}'`;
};