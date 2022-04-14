import { useContextSelector } from "use-context-selector";

import { FontSizeContextData } from "../font-size-context";

export default function useBreakpointsContext() {
  const breakpoints = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.breakpoints
  );

  const setBreakpoints = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setBreakpoints
  );

  return {
    breakpoints,
    setBreakpoints,
  };
}
