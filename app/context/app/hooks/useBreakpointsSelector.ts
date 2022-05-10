import { useContextSelector } from "use-context-selector";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";

import { AppContextData } from "../app-context";
import { DataProvider } from "../interfaces";

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
      dispatch: (payload?: DataProvider) =>
        loadPreConfiguredBreakpoints(payload),
    },
  };

  const { getByProvider } = useBreakpointsData();

  function loadPreConfiguredBreakpoints(provider?: DataProvider) {
    const preConfiguredBreakpoints = getByProvider(provider);
    setBreakpoints(preConfiguredBreakpoints);
  }

  return {
    breakpoints,
    setBreakpoints,
    actions,
  };
}
