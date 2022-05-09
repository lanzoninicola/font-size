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

  const currentTypeScaleStepId = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.currentTypeScaleStepId
  );

  const setCurrentTypeScaleStepId = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setCurrentTypeScaleStepId
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

  const lineHeight = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.lineHeight
  );

  const setLineHeight = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setLineHeight
  );

  return {
    entityState,
    setEntityState,
    currentBreakpointId,
    setCurrentBreakpointId,
    currentTypeScaleStepId,
    setCurrentTypeScaleStepId,
    minFontSize,
    setMinFontSize,
    maxFontSize,
    setMaxFontSize,
    lineHeight,
    setLineHeight,
  };
}
