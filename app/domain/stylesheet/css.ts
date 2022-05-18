/**
 * @description: Returns the CSS code for the given property and value
 * @param property - the CSS property
 * @param value - the CSS value
 * @param forceImportant - if true add !important to the CSS
 * @returns {string} - The CSS code block
 *
 * @private
 *
 * */
export default function css(
  property: string,
  value: string,
  forceImportant: boolean
): string {
  let codeBlock = `  ${property}: ${value}`;
  codeBlock += forceImportant ? " !important" : "";
  codeBlock += `;`;
  codeBlock += `\n`;

  return codeBlock;
}
