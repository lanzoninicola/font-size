import { useEffect, useState } from "react";

export default function useClampFormula() {
  // const { pixelsPerRem } = usePixelsPerRem();
  // const { minViewportWidth } = useMinViewportWidth();
  // const { maxViewportWidth } = useMaxViewportWidth();
  // const { minFontSize } = useMinFontSize();
  // const { maxFontSize } = useMaxFontSize();
  // function calculateMinWidth() {
  //   let _minWidth: MinViewportWidthState = {} as MinViewportWidthState;
  //   for (const tag in minViewportWidth) {
  //     _minWidth[tag as keyof MinViewportWidthState] =
  //       minViewportWidth[tag as keyof MinViewportWidthState] / pixelsPerRem;
  //   }
  //   return _minWidth;
  // }
  // function calculateMaxWidth() {
  //   let _maxWidth: MaxViewportWidthState = {} as MaxViewportWidthState;
  //   for (const tag in maxViewportWidth) {
  //     _maxWidth[tag as keyof MaxViewportWidthState] =
  //       maxViewportWidth[tag as keyof MaxViewportWidthState] / pixelsPerRem;
  //   }
  //   return _maxWidth;
  // }
  // function calculateSlope({
  //   minWidth,
  //   maxWidth,
  // }: {
  //   minWidth: MinViewportWidthState;
  //   maxWidth: MinViewportWidthState;
  // }) {
  //   let _slope: SlopeState = {} as SlopeState;
  //   for (const tag in minFontSize) {
  //     _slope[tag as keyof SlopeState] =
  //       (maxFontSize[tag as keyof SlopeState] -
  //         minFontSize[tag as keyof SlopeState]) /
  //       (maxWidth[tag as keyof SlopeState] - minWidth[tag as keyof SlopeState]);
  //   }
  //   return _slope;
  // }
  // function calculateYAxisIntersection({
  //   minWidth,
  //   slope,
  // }: {
  //   minWidth: MinViewportWidthState;
  //   slope: SlopeState;
  // }) {
  //   let _yAxisIntersection: YAxisIntersectionState =
  //     {} as YAxisIntersectionState;
  //   for (const tag in minFontSize) {
  //     _yAxisIntersection[tag as keyof YAxisIntersectionState] =
  //       -minWidth[tag as keyof YAxisIntersectionState] *
  //         slope[tag as keyof YAxisIntersectionState] +
  //       minFontSize[tag as keyof YAxisIntersectionState];
  //   }
  //   return _yAxisIntersection;
  // }
  // const minWidth = calculateMinWidth();
  // const maxWidth = calculateMaxWidth();
  // const [slope, setSlope] = useState({} as SlopeState);
  // const [yAxisIntersection, setYAxisIntersection] = useState(
  //   {} as YAxisIntersectionState
  // );
  // useEffect(() => {
  //   const slope = calculateSlope({
  //     minWidth,
  //     maxWidth,
  //   });
  //   const yAxisIntersection = calculateYAxisIntersection({
  //     minWidth,
  //     slope,
  //   });
  //   setSlope(slope);
  //   setYAxisIntersection(yAxisIntersection);
  // }, [minViewportWidth, maxViewportWidth, minFontSize, maxFontSize]);
  // return {
  //   minWidth,
  //   maxWidth,
  //   slope,
  //   yAxisIntersection,
  // };

  return {
    minWidth: 0,
    maxWidth: 0,
    slope: 0,
    yAxisIntersection: 0,
  };
}
