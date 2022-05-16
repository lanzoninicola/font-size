import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import { Typography } from "~/context/app/types";

import useTypeScaleStepsQueryService from "../type-scale-steps/useTypeScaleStepsQueryService";
import css from "./css";

export default function useTypographyStylesheet(typography: Typography) {
  const { getHeadersSteps } = useTypeScaleStepsQueryService();

  /**
   * @description Combines the body and headers typography CSS styles
   * @param forceImportant
   * @returns {string} The CSS code block
   */
  function getStyleSheet(forceImportant = false) {
    let codeBlock = "";
    codeBlock += getTypographyBodyStylesheet(forceImportant);
    codeBlock += getTypographyHeadersStylesheet(forceImportant);
    return codeBlock;
  }

  /**
   * @description: Returns the CSS code for the body typography from the Typography state
   * @param forceImportant - if true add !important to the CSS
   * @returns {string} - The CSS code block
   *
   * */
  function getTypographyBodyStylesheet(forceImportant = false) {
    const { fontFamily, fontWeight } = typography.body;

    let codeBlock = `  body {`;
    codeBlock += `\n`;
    // font-family style
    codeBlock += css("font-family", fontFamily, forceImportant);
    // font-weight style
    codeBlock += css("font-weight", fontWeight, forceImportant);

    codeBlock += `  }`;
    codeBlock += `\n`;

    return codeBlock;
  }

  /**
   * @description: Returns the CSS code for the headers typography from the Typography state
   * @param forceImportant - if true add !important to the CSS
   * @returns {string} - The CSS code block
   *
   * */
  function getTypographyHeadersStylesheet(forceImportant = false) {
    const headers = getHeadersSteps();
    const { fontFamily, fontWeight } = typography.headings;
    let codeBlock = "";

    headers.forEach((header) => {
      codeBlock += `  ${header.key} {`;
      codeBlock += `\n`;
      // font-family style
      codeBlock += css("font-family", fontFamily, forceImportant);
      // font-weight style
      codeBlock += css("font-weight", fontWeight, forceImportant);
      codeBlock += `  }`;
      codeBlock += `\n`;
    });

    return codeBlock;
  }

  return {
    getTypographyBodyStylesheet,
    getTypographyHeadersStylesheet,
    getStyleSheet,
  };
}
