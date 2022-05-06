import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { DataProvider } from "~/context/app/interfaces";
import { Breakpoints } from "~/context/breakpoint-builder/interfaces";

export default function useBreakpointsData() {
  const { setBreakpoints } = useBreakpointsSelector();
  const [dataProvider, setDataProvider] = useLocalStorage(
    "FS_INIT_BREAKPOINTS_PROVIDER",
    DataProvider.default
  );

  /**
   * @description Initialize the state of breakpoints data and set the provider to local storage
   */
  function initBreakpoints(provider?: DataProvider) {
    const b = getByProvider(provider);
    setBreakpoints(b);
  }

  /**
   * @description Returns the breakpoints data based on the provider of data (default, chakraui, tailwindcss, bootstrap).
   * Also, set the provider name to local storage
   */
  function getByProvider(provider?: DataProvider) {
    const currentProvider = provider || DataProvider.default;

    if (currentProvider === DataProvider.default) {
      return _getDefaults();
    }

    return _getDefaults();
  }

  function _getDefaults(): Breakpoints {
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
    getByProvider,
  };
}
