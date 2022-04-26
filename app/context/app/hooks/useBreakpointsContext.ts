import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";

export default function useBreakpointsContext() {
  const breakpoints = useContextSelector(
    AppContextData,
    (ctx) => ctx?.breakpoints
  );

  const setBreakpoints = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setBreakpoints
  );

  return {
    breakpoints,
    setBreakpoints,
  };
}
