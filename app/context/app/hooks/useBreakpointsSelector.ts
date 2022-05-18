import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";
import { BreakpointsProvider } from "../types/breakpoints";
import useBreakpointsInitialState from "./useBreakpointsInitialState";

export default function useBreakpointsSelector() {
  const breakpoints = useContextSelector(
    AppContextData,
    (ctx) => ctx?.breakpoints
  );

  const setBreakpoints = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setBreakpoints
  );

  const actions = {
    BREAKPOINTS__INIT_WITH_PRE_BUILT_BREAKPOINTS: {
      dispatch: (payload?: BreakpointsProvider) =>
        loadPreConfiguredBreakpoints(payload),
    },
  };

  const { get } = useBreakpointsInitialState();

  function loadPreConfiguredBreakpoints(provider?: BreakpointsProvider) {
    const preConfiguredBreakpoints = get(provider);
    setBreakpoints(preConfiguredBreakpoints);
  }

  return {
    breakpoints,
    setBreakpoints,
    actions,
  };
}
