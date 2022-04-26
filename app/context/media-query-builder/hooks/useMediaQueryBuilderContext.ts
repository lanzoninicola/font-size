import { useContextSelector } from "use-context-selector";
import { MediaQueryBuilderContextData } from "../media-query-builder-context";

export default function useMediaQueryBuilderContext() {
  const entityState = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.entityState
  );

  const setEntityState = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setEntityState
  );

  const currentBreakpointId = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.currentBreakpointId
  );

  const setCurrentBreakpointId = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setCurrentBreakpointId
  );

  const currentSelectorId = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.currentSelectorId
  );

  const setCurrentSelector = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setCurrentSelector
  );

  const minFontSize = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.minFontSize
  );

  const setMinFontSize = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setMinFontSize
  );

  const maxFontSize = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.maxFontSize
  );

  const setMaxFontSize = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setMaxFontSize
  );

  return {
    entityState,
    setEntityState,
    currentBreakpointId,
    setCurrentBreakpointId,
    currentSelectorId,
    setCurrentSelector,
    minFontSize,
    setMinFontSize,
    maxFontSize,
    setMaxFontSize,
  };
}
