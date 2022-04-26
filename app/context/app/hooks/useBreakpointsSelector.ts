import { useEffect } from "react";
import { Breakpoints } from "~/context/breakpoint-builder/interfaces";

import useBreakpointsContext from "./useBreakpointsContext";
import useBreakpointsLocalStorage from "./useBreakpointsLocalStorage";

export default function useBreakpointsSelector() {
  const {
    breakpoints: breakpointsContext,
    setBreakpoints: setBreakpointsContext,
  } = useBreakpointsContext();

  const {
    breakpoints: breakpointsLocalStorage,
    setBreakpoints: setBreakpointsLocalStorage,
  } = useBreakpointsLocalStorage();

  function setBreakpoints(nextState: Breakpoints | null) {
    setBreakpointsContext(nextState);
    setBreakpointsLocalStorage(nextState);
  }

  useEffect(() => {
    if (breakpointsLocalStorage) {
      setBreakpointsContext(breakpointsLocalStorage);
    }
  }, [breakpointsLocalStorage]);

  return {
    breakpoints: breakpointsContext,
    setBreakpoints,
  };
}
