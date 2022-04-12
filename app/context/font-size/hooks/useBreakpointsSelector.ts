import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_BREAKPOINTS } from "~/context/constants";
import { Breakpoints } from "~/context/interfaces";
import { FontSizeContextData } from "../font-size-context";

export default function useBreakpointsSelector() {
  const breakpoints = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.breakpoints
  );

  const setBreakpointsState = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setBreakpoints
  );

  const [breakpointsOnLocalStorage, setBreakpointsOnLocalStorage] =
    useLocalStorage<Breakpoints | null>(FS_CONTEXT_BREAKPOINTS, null);

  function setBreakpoints(nextState: Breakpoints | null) {
    setBreakpointsState(nextState);
    setBreakpointsOnLocalStorage(nextState);
  }

  useEffect(() => {
    if (breakpointsOnLocalStorage) {
      setBreakpointsState(breakpointsOnLocalStorage);
    }
  }, [breakpoints]);

  return {
    breakpoints,
    setBreakpoints,
  };
}
