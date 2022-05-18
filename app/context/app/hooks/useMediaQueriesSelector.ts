import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";

import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import useMediaQueriesQueryService from "~/domain/media-queries/useMediaQueriesQueryService";
import useMediaQueriesStylesheet from "~/domain/stylesheet/useMediaQueriesStylesheet";
import useTypeScaleCalculator from "~/domain/type-scale/type-scale-calculator/useTypeScaleCalculator";

import { AppContextData } from "../app-context";
import { BreakpointId } from "../types/breakpoints";
import { MediaQuery, MediaQueryStepEdit } from "../types/media-queries";
import {
  TypeScaleConfig,
  MinMaxTypeScaleConfig,
} from "../types/type-scale-config";
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

  const actions = {
    MEDIA_QUERIES__ON_MEDIA_QUERY_CHANGE: {
      dispatch: (mediaQuery: MediaQueryStepEdit) =>
        onMediaQueryChange(mediaQuery),
    },
    MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE: {
      dispatch: (payload: TypeScaleConfig) =>
        generateTypeScale(payload.breakpointId, payload.min, payload.max),
    },
    MEDIA_QUERIES__POST_MESSAGE_CURRENT_MEDIA_QUERIES: {
      dispatch: (payload: MediaQuery[]) => publishCurrentMediaQueries(payload),
    },
  };

  const { typeScaleSteps } = useTypeScaleStepsSelector();
  const { calculateBreakpointTypeScale } = useTypeScaleCalculator();
  const {
    getMediaQueryByBreakpointIdAndStepId,
    removeMediaQueriesByBreakpointId,
  } = useMediaQueriesQueryService(mediaQueries);
  const { getMediaQueriesStylesheet } = useMediaQueriesStylesheet();
  const { actions: previewActions } = usePreviewWindowsSelector();

  function onMediaQueryChange(mediaQuery: MediaQueryStepEdit) {}

  function generateTypeScale(
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

    // publish the new media queries to the preview windows
    publishCurrentMediaQueries([
      ...mediaQueriesRest,
      ...newBreakpointMediaQueries,
    ]);
  }

  function publishCurrentMediaQueries(mediaQueries: MediaQuery[]) {
    previewActions.PREVIEW_WINDOWS__POST_MESSAGE_CURRENT_MEDIA_QUERIES.dispatch(
      {
        stylesheetMediaQueriesCode: getMediaQueriesStylesheet(
          mediaQueries,
          true
        ),
      }
    );
  }

  return {
    mediaQueries,
    setMediaQueries,
    actions,
  };
}
