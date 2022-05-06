import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";
import { TypeScaleConfig } from "../interfaces";
import useHtmlSelectorsSelector from "./useHtmlSelectorsSelector";

export default function useMediaQueriesSelector() {
  const mediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.mediaQueries
  );

  const setMediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setMediaQueries
  );

  const {htmlSelectors} = useHtmlSelectorsSelector()

  const actions = {
    SET_BREAKPOINT_TYPE_SCALE_STEP_DATA: {
      dispatch: (payload: TypeScaleConfig) =>
        setBreakpointTypeScaleStepData(payload),
    },
  };

  function setBreakpointTypeScaleStepData(payload: TypeScaleConfig) {
    const isMediaQueriesEmpty = mediaQueries === null || Object.keys(mediaQueries).length === 0


    htmlSelectors.forEach((selector) => {

    
    if (isMediaQueriesEmpty) {




      const breakpointMediaQueries = {
        [payload.breakpointId]: {
          [payload.baseStep]: {
    }


    let breakpointMediaQueries = mediaQueries;
  }

  return {
    mediaQueries,
    setMediaQueries,
  };
}
