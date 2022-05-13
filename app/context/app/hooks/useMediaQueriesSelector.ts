import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { MediaQueryStepEdit } from "~/context/media-query-builder/interfaces/media-query";
import { MinMaxTypeScaleConfig } from "~/context/type-scale-calculator-form/interfaces";
import useMediaQueriesQueryService from "~/domain/media-queries/useMediaQueriesQueryService";
import useTypeScaleCalculatorUtils from "~/domain/type-scale-calculator/useTypeScaleCalculatorUtils";

import { AppContextData } from "../app-context";
import { TypeScaleConfig } from "../interfaces";
import useTypeScaleStepsSelector from "./useTypeScaleStepsSelector";

export default function useMediaQueriesSelector() {
  const mediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.mediaQueries
  );
  const setMediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setMediaQueries
  );

  const { typeScaleSteps } = useTypeScaleStepsSelector();
  const { calculateBreakpointTypeScale } = useTypeScaleCalculatorUtils();
  const {
    getMediaQueryByBreakpointIdAndStepId,
    removeMediaQueriesByBreakpointId,
  } = useMediaQueriesQueryService(mediaQueries);

  const actions = {
    MEDIA_QUERIES__ON_MEDIA_QUERY_CHANGE: {
      dispatch: (mediaQuery: MediaQueryStepEdit) =>
        onMediaQueryChange(mediaQuery),
    },
    MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE: {
      dispatch: (payload: TypeScaleConfig) =>
        onTypeScaleConfigChange(payload.breakpointId, payload.min, payload.max),
    },
  };

  function onMediaQueryChange(mediaQuery: MediaQueryStepEdit) {}

  function onTypeScaleConfigChange(
    breakpointId: BreakpointId,
    min: MinMaxTypeScaleConfig,
    max: MinMaxTypeScaleConfig
  ) {
    if (!typeScaleSteps) {
      return;
    }

    // calculate the breakpoint type scale. It returns the min and max font size for each step
    const breakpointTypeScale = calculateBreakpointTypeScale(
      breakpointId,
      min,
      max,
      typeScaleSteps
    );

    const newBreakpointMediaQueries = typeScaleSteps.map((step) => {
      // get lineHeight / marginBottom / fontFamily info from the existing media query for the breakpoint and stepId
      const mediaQueryStepConfig = getMediaQueryByBreakpointIdAndStepId(
        breakpointId,
        step.key
      );

      // get the min and max font size calculated for the step
      const stepTypeScaleCalculated = breakpointTypeScale.find(
        (typeScale) => typeScale.stepKey == step.key
      );

      return {
        breakpointId,
        stepId: step.key,
        minFontSize:
          stepTypeScaleCalculated?.minFontSize ||
          mediaQueryStepConfig.minFontSize,
        maxFontSize:
          stepTypeScaleCalculated?.maxFontSize ||
          mediaQueryStepConfig.maxFontSize,
        lineHeight: mediaQueryStepConfig.lineHeight,
        marginBottom: mediaQueryStepConfig.marginBottom,
      };
    });

    // remove the old media query for the breakpoint if it exists
    const mediaQueriesRest = removeMediaQueriesByBreakpointId(breakpointId);

    // add the new media query for the breakpoint
    setMediaQueries([...mediaQueriesRest, ...newBreakpointMediaQueries]);
  }

  return {
    mediaQueries,
    setMediaQueries,
    actions,
  };
}
