import { useContextSelector } from "use-context-selector";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";

import { AppContextData } from "../app-context";
import { BreakpointsProvider } from "../types";

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
    BREAKPOINTS__INIT_WITH_PRE_CONFIGURED_BREAKPOINTS: {
      dispatch: (payload?: BreakpointsProvider) =>
        loadPreConfiguredBreakpoints(payload),
    },
  };

  const { getByProvider } = useBreakpointsData();

  function loadPreConfiguredBreakpoints(provider?: BreakpointsProvider) {
    const preConfiguredBreakpoints = getByProvider(provider);
    setBreakpoints(preConfiguredBreakpoints);
  }

  return {
    breakpoints,
    setBreakpoints,
    actions,
  };
}
