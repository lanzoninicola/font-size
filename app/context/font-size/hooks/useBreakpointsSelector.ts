import { Breakpoints } from "~/context/font-size/interfaces";

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

  // Commented this because it cause a re-rendering of the whole app
  // every time a component is render.
  // With this configuration, if local storage is not enabled or accessible then the app will crash
  //
  // useEffect(() => {
  //   if (breakpointsOnLocalStorage) {
  //     setBreakpointsState(breakpointsOnLocalStorage);
  //   }
  // }, []);

  return {
    breakpoints: breakpointsLocalStorage,
    setBreakpoints,
  };
}
