import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
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

  const actions = {
    CHANGE_CURRENT_BREAKPOINT: {
      dispatch: (payload: BreakpointId) => setCurrentBreakpointId(payload),
    },
  };

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
