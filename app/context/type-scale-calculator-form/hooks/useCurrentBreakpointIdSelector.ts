import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import useNotifications from "~/domain/app/useNotifications";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useCurrentBreakpointIdSelector() {
  const [foo, setFoo] = useState("");

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

  function changeCurrentBreakpoint(breakpointId: BreakpointId) {
    const prevState = currentBreakpointId;

    setCurrentBreakpointId(breakpointId);

    previewWindowsActions.PREVIEW_WINDOWS__SELECTED_BREAKPOINTS.dispatch(
      breakpointId
    );

    if (prevState === "") {
      const message =
        "The smallest and largest device in the preview area was loaded according to the selected breakpoint.";
      infoNotification(message);
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
