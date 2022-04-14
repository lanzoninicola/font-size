import { useEffect, useState } from "react";
import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import { MediaQueries, HTMLTags } from "~/context/font-size/interfaces";

import useBreakpointService from "../breakpoints/useBreakpointService";
import calculateClampSlope from "../media-query/calculateClampSlope";
import calculateClampYAxisIntersection from "../media-query/calculateClampYAxisIntersection";
import generateClampFormula from "../media-query/generateClampFormula";
import useMediaQueryService from "../media-query/useMediaQueryService";

export default function useCSSCodeBlock({
  mediaQueries,
}: {
  mediaQueries: MediaQueries | null;
}) {
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const { getFontSizesByTagAndBreakpointId } = useMediaQueryService();
  const { getBreakpointValuesById } = useBreakpointService();

  const [codeBlock, setCodeBlock] = useState<string>("");

  function buildCodeBlock() {
    const htmlPercentage = (100 / 16) * pixelsPerRem;

    let codeBlock = `html {font-size: ${htmlPercentage}%;} /*${pixelsPerRem}px*/`;
    codeBlock += `\n`;

    if (!mediaQueries) {
      return codeBlock;
    }

    for (const tag in mediaQueries) {
      const mediaQueryTag = mediaQueries[tag as HTMLTags];

      if (!mediaQueryTag) {
        continue;
      }

      for (const breakpointId in mediaQueryTag) {
        const { minWidth, minWidthREM, maxWidth, maxWidthREM } =
          getBreakpointValuesById(breakpointId);

        const { minFontSize, maxFontSize } = getFontSizesByTagAndBreakpointId(
          tag as HTMLTags,
          breakpointId
        );

        const slope = calculateClampSlope(
          minFontSize,
          maxFontSize,
          minWidthREM,
          maxWidthREM
        );

        const yAxisIntersection = calculateClampYAxisIntersection(
          minFontSize,
          slope,
          minWidthREM
        );

        const clampFormula = generateClampFormula(
          minFontSize,
          maxFontSize,
          slope,
          yAxisIntersection
        );

        codeBlock += `@media only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {`;
        codeBlock += `\n`;
        codeBlock += `  ${tag} {`;
        codeBlock += `\n`;
        codeBlock += `   font-size: ${clampFormula} !important;`;
        codeBlock += `\n`;
        codeBlock += `  }`;
        codeBlock += `\n`;
        codeBlock += `}`;
        codeBlock += `\n`;
      }
    }

    return codeBlock;
  }

  useEffect(() => {
    setCodeBlock(buildCodeBlock());
  }, []);

  return {
    codeBlock,
  };
}
