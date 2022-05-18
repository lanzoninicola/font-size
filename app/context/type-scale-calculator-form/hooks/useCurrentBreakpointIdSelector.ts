import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/app/types/breakpoints";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import useNotifications from "~/domain/app/useNotifications";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useCurrentBreakpointIdSelector() {
  const currentBreakpointId = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.currentBreakpointId
  );

  const setCurrentBreakpointId = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setCurrentBreakpointId
  );

  const { actions: previewWindowsActions } = usePreviewWindowsSelector();
  const { infoNotification } = useNotifications();

  const actions = {
    TYPE_SCALE_CALCULATOR__CHANGE_BREAKPOINT: {
      dispatch: (payload: BreakpointId) => changeCurrentBreakpoint(payload),
    },
  };

  function changeCurrentBreakpoint(nextBreakpointId: BreakpointId) {
    setCurrentBreakpointId(nextBreakpointId);

    handlePreviewActions(nextBreakpointId);

    const prevState = currentBreakpointId;
    if (prevState !== nextBreakpointId && nextBreakpointId !== "") {
      const message =
        "The smallest and largest device was loaded in the preview area according to the selected breakpoint.";
      infoNotification(message);
    }
  }

  function handlePreviewActions(nextBreakpointId: BreakpointId) {
    if (nextBreakpointId === "") {
      previewWindowsActions.PREVIEW_WINDOWS__SELECTED_EMPTY_BREAKPOINTS.dispatch();
    }

    if (nextBreakpointId !== "") {
      previewWindowsActions.PREVIEW_WINDOWS__REMOVE_ALL_WINDOWS.dispatch();

      previewWindowsActions.PREVIEW_WINDOWS__SELECTED_BREAKPOINTS.dispatch(
        nextBreakpointId
      );
    }
  }

  useEffect(() => {
    if (currentBreakpointId === undefined) {
      throw new Error(
        "useCurrentBreakpointIdSelector hook is used outside of the TypeScaleCalculatorFormContext"
      );
    }
  }, []);

  return {
    currentBreakpointId,
    actions,
  };
}
