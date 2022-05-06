import { useContextSelector } from "use-context-selector";
import useTypeScaleCalculatorFormSelector from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormSelector";

import { AppContextData } from "../app-context";
import { TypeScaleConfig } from "../interfaces";
import useHtmlSelectorsSelector from "./useHtmlSelectorsSelector";
import useTypeScaleSelector from "./useTypeScaleSelector";

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
    SET_BREAKPOINT_TYPE_SCALE_AFTER_SAVING_CONFIGURATION: {
      dispatch: (payload: TypeScaleConfig) => setBreakpointTypeScale(payload),
    },
  };

  const { htmlSelectors } = useHtmlSelectorsSelector();
  const { typeScale } = useTypeScaleSelector();

  function setBreakpointTypeScale(payload: TypeScaleConfig) {
    const isMediaQueriesEmpty =
      mediaQueries === null || Object.keys(mediaQueries).length === 0;

    // get the type scale configuration for the given breakpoint
    const { breakpointId, min, max } = payload;

    // calculate the min and max font size for each selector base on the type scale configuration
    if (htmlSelectors) {
      const breakpointMQ = {};

      htmlSelectors.forEach((selector) => {
        // Math.min(min.fontSizeREM * Math.pow(min.scaleRatio, selector.position));
        // Math.max(max.fontSizeREM * Math.pow(max.scaleRatio, selector.position));
      });
    }

    let breakpointMediaQueries = mediaQueries;
  }

  return {
    mediaQueries,
    setMediaQueries,
  };
}
