import { useEffect, useState } from "react";
import { Tags } from "~/context/interfaces";
import useMaxFontSize from "../../../context/font-size/hooks/useMaxFontSize";
import useMaxViewportWidth from "../../../context/font-size/hooks/useMaxViewportWidth";
import useMinFontSize from "../../../context/font-size/hooks/useMinFontSize";
import useMinViewportWidth from "../../../context/font-size/hooks/useMinViewportWidth";
import usePixelsPerRem from "../../../context/font-size/hooks/usePixelsPerRem";

export default function useClampFormulaByTag({ tag }: { tag: Tags }) {
  const { pixelsPerRem } = usePixelsPerRem();
  const { minViewportWidth } = useMinViewportWidth();
  const { maxViewportWidth } = useMaxViewportWidth();
  const { minFontSize } = useMinFontSize();
  const { maxFontSize } = useMaxFontSize();

  const minWidth = minViewportWidth[tag] / pixelsPerRem;
  const maxWidth = maxViewportWidth[tag] / pixelsPerRem;
  const tagMinFontSize = minFontSize[tag];
  const tagMaxFontSize = maxFontSize[tag];

  const [slope, setSlope] = useState(0);
  const [yAxisIntersection, setYAxisIntersection] = useState(0);

  useEffect(() => {
    setSlope((tagMaxFontSize - tagMinFontSize) / (maxWidth - minWidth));
    setYAxisIntersection(-minWidth * slope + tagMinFontSize);
  }, [tag, tagMaxFontSize, tagMinFontSize, maxWidth, minWidth]);

  return {
    formula: `clamp(${tagMinFontSize}rem, ${yAxisIntersection.toFixed(
      4
    )}rem + ${(slope * 100).toFixed(4)}vw, ${tagMaxFontSize}rem)`,
    values: {
      minFontSize: tagMinFontSize,
      maxFontSize: tagMaxFontSize,
      slope,
      yAxisIntersection,
    },
  };
}
