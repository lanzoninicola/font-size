import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { Breakpoints } from "~/context/breakpoint-builder/interfaces";

export enum DataProvider {
  default = "default",
  chakraui = "chackraui",
  tailwindcss = "tailwindcss",
  bootstrap = "bootstrap",
}

export default function useBreakpointsData() {
  const { setBreakpoints } = useBreakpointsSelector();
  const [_, setProvider] = useLocalStorage("FS_INIT_BREAKPOINTS_PROVIDER");

  function initBreakpoints(provider: DataProvider) {
    const b = getBreakpointByProvider(provider);
    setBreakpoints(b);
    setProvider(provider);
  }

  function getBreakpointByProvider(provider: DataProvider) {
    if (provider === DataProvider.default) {
      return _getDefaultBreakpoints();
    }

    return _getDefaultBreakpoints();
  }

  function _getDefaultBreakpoints(): Breakpoints {
    return {
      min300max768: { label: "xsmall & small", minWidth: 300, maxWidth: 768 },
      min769max1280: { label: "medium & large", minWidth: 769, maxWidth: 1279 },
      min1281max3840: {
        label: "xlarge & 2xlarge",
        minWidth: 1280,
        maxWidth: 3840,
      },
    };
  }

  return {
    initBreakpoints,
  };
}
