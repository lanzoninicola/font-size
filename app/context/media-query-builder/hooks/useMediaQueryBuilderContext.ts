import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
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

  const marginBottom = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.marginBottom
  );

  const setMarginBottom = useContextSelector(
    MediaQueryBuilderContextData,
    (ctx) => ctx?.setMarginBottom
  );

  const { actions: previewWindowsActions } = usePreviewWindowsSelector();

  const actions = {
    MEDIA_QUERY_BUILDER__CHANGE_BREAKPOINT: {
      dispatch: (payload: BreakpointId) => changeBreakpoint(payload),
    },
  };

  function changeBreakpoint(currentBreakpointId: BreakpointId) {
    previewWindowsActions.PREVIEW_WINDOWS__SELECTED_BREAKPOINTS.dispatch(
      currentBreakpointId
    );
  }

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
    marginBottom,
    setMarginBottom,
    actions,
  };
}
