import { BreakpointsProvider, Breakpoints } from "../types/breakpoints";

type UseBreakpointsInitialState = {
  get: (provider?: BreakpointsProvider) => Breakpoints;
};

export default function useBreakpointsInitialState(): UseBreakpointsInitialState {
  /**
   * @description Returns the breakpoints data based on the provider of data (default, chakraui, tailwindcss, bootstrap).
   * Also, set the provider name to local storage
   */
  function get(provider?: BreakpointsProvider) {
    const currentProvider = provider || BreakpointsProvider.default;

    if (currentProvider === BreakpointsProvider.default) {
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
    get,
  };
}
