import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import { TypeScaleStepEntityState } from "~/context/app/interfaces";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/interfaces";
import parseInputString from "../utilities/parseInputString";
import useMediaQueriesQueryService from "./useMediaQueriesQueryService";

export default function useMediaQueriesBuilderService() {
  const { mediaQueries } = useMediaQueriesSelector();
  const {
    entityState,
    currentBreakpointId,
    currentTypeScaleStepId,
    minFontSize,
    maxFontSize,
    lineHeight,
    setEntityState,
    setCurrentBreakpointId,
    setCurrentTypeScaleStepId,
    setMinFontSize,
    setMaxFontSize,
    setLineHeight,
  } = useMediaQueryBuilderContext();

  const { getMediaQueryByBreakpointIdAndStepId } =
    useMediaQueriesQueryService(mediaQueries);

  function changeCurrentBreakpoint(bp: BreakpointId) {
    setCurrentBreakpointId(bp);
  }

  /**
   * @description Show step details to edit or create new media query
   *
   * @param s - the step
   */
  function editCurrentSelector(step: TypeScaleStepConfig) {
    setEntityState(TypeScaleStepEntityState.edit);
    setCurrentTypeScaleStepId(step.key);

    const {
      minFontSize: stepMinFontSize,
      maxFontSize: stepMaxFontSize,
      lineHeight: stepLineHeight,
      marginBottom: stepMarginBottom,
      fontFamily: stepFontFamily,
    } = getMediaQueryByBreakpointIdAndStepId(currentBreakpointId, step.key);

    changeMinFontSize(String(stepMinFontSize));
    changeMaxFontSize(String(stepMaxFontSize));
    changeLineHeight(String(stepLineHeight));
  }

  function closeEditCurrentSelector() {
    setEntityState(TypeScaleStepEntityState.idle);
    setCurrentTypeScaleStepId("");
  }

  function changeMinFontSize(minfs: string) {
    parseInputString(minfs);
    setMinFontSize(minfs);
  }

  function changeMaxFontSize(maxfs: string) {
    parseInputString(maxfs);
    setMaxFontSize(maxfs);
  }

  function changeLineHeight(lh: string) {
    parseInputString(lh);
    setLineHeight(lh);
  }

  return {
    entityState,
    currentBreakpointId,
    currentTypeScaleStepId,
    minFontSize,
    maxFontSize,
    lineHeight,
    changeCurrentBreakpoint,
    editCurrentSelector,
    closeEditCurrentSelector,
    changeMinFontSize,
    changeMaxFontSize,
    changeLineHeight,
  };
}
