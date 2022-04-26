import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { SelectorId } from "~/context/app/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import { SelectorEntityState } from "~/context/shared/interfaces/entity-state";
import parseInputString from "../utilities/parseInputString";
import useMediaQueriesQueryService from "./useMediaQueriesQueryService";

export default function useMediaQueriesBuilderService() {
  const {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    minFontSize,
    maxFontSize,
    setEntityState,
    setCurrentBreakpointId,
    setCurrentSelector,
    setMinFontSize,
    setMaxFontSize,
  } = useMediaQueryBuilderContext();

  const { getFontSizeRange } = useMediaQueriesQueryService();

  function changeCurrentBreakpoint(bp: BreakpointId) {
    setCurrentBreakpointId(bp);
  }

  /**
   * @description Show selector details to edit or create new media query
   *
   * @param s - the selector
   */
  function editCurrentSelector(s: SelectorId) {
    setEntityState(SelectorEntityState.edit);
    setCurrentSelector(s);

    const {
      minFontSize: selectorMinFontSize,
      maxFontSize: selectorMaxFontSize,
    } = getFontSizeRange(currentBreakpointId, s);

    changeMinFontSize(String(selectorMinFontSize));
    changeMaxFontSize(String(selectorMaxFontSize));
  }

  function closeEditCurrentSelector(s: SelectorId) {
    setEntityState(SelectorEntityState.idle);
    setCurrentSelector("");
  }

  function changeMinFontSize(minfs: string) {
    parseInputString(minfs);
    setMinFontSize(minfs);
  }

  function changeMaxFontSize(maxfs: string) {
    parseInputString(maxfs);
    setMaxFontSize(maxfs);
  }

  return {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    minFontSize,
    maxFontSize,
    changeCurrentBreakpoint,
    editCurrentSelector,
    closeEditCurrentSelector,
    changeMinFontSize,
    changeMaxFontSize,
  };
}
