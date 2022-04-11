import { useEffect, useState } from "react";
import { Tags } from "~/context/interfaces";
import useMaxFontSize from "./useMaxFontSize";
import useMaxViewportWidth from "./useMaxViewportWidth";
import useMinFontSize from "./useMinFontSize";
import useMinViewportWidth from "./useMinViewportWidth";
import usePixelsPerRem from "./usePixelsPerRem";

export default function useClampFormula({ tag }: { tag: Tags }) {
  const { pixelsPerRem } = usePixelsPerRem();
  const { minViewportWidth } = useMinViewportWidth();
  const { maxViewportWidth } = useMaxViewportWidth();
  const { minFontSize } = useMinFontSize();
  const { maxFontSize } = useMaxFontSize();

  const minWidth = minViewportWidth[tag] / pixelsPerRem;
  const maxWidth = maxViewportWidth[tag] / pixelsPerRem;
  const _minFontSize = minFontSize[tag];
  const _maxFontSize = maxFontSize[tag];

  const slope = (_maxFontSize - _minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + _minFontSize;

  return `clamp(${_minFontSize}rem, ${yAxisIntersection.toFixed(4)}rem + ${(
    slope * 100
  ).toFixed(4)}vw, ${_maxFontSize}rem)`;
}
