import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_BREAKPOINTS } from "~/context/constants";
import { Breakpoints } from "~/context/font-size/interfaces";

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
