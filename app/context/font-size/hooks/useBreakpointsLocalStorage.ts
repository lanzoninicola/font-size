import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { Breakpoints } from "~/context/breakpoint-builder/interfaces";
import { FS_CONTEXT_BREAKPOINTS } from "~/context/constants";

export default function useBreakpointsLocalStorage() {
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints | null>(
    FS_CONTEXT_BREAKPOINTS,
    null
  );

  return {
    breakpoints,
    setBreakpoints,
  };
}
