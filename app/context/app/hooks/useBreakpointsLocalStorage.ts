import useLocalStorage from "~/components/shared/hooks/useLocalStorage";

import { Breakpoints } from "~/context/breakpoint-builder/interfaces";
import { FS_CONTEXT_BREAKPOINTS } from "~/context/app/constants";

export default function useBreakpointsLocalStorage() {
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints | null>(
    FS_CONTEXT_BREAKPOINTS,
    DEFAULT_BREAKPOINTS
  );

  return {
    breakpoints,
    setBreakpoints,
  };
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
  min300max768: { label: "xsmall & small", minWidth: 300, maxWidth: 768 },
  min769max1280: { label: "medium & large", minWidth: 769, maxWidth: 1280 },
  min1281max3840: { label: "xlarge & 2xlarge", minWidth: 1281, maxWidth: 3840 },
};
