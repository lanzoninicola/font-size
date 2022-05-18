import { BreakpointId } from "~/context/app/types/breakpoints";
import { TypeScaleConfig } from "~/context/app/types/type-scale-config";

export default function useTypeScaleQueryService(
  typeScaleConfig: TypeScaleConfig[]
) {
  /**
   * @description Returns the type scale configuration for the given breakpoint
   * @param breakpointId
   * @returns
   */
  function getBreakpointConfig(
    breakpointId: BreakpointId
  ): TypeScaleConfig | null {
    if (!typeScaleConfig || typeScaleConfig.length === 0) {
      return null;
    }

    const breakpointConfig = typeScaleConfig.find(
      (config) => config.breakpointId === breakpointId
    );

    if (!breakpointConfig) {
      return null;
    }

    return breakpointConfig;
  }

  function isBreakpointConfigExists(breakpointId: BreakpointId) {
    return !!getBreakpointConfig(breakpointId);
  }

  /**
   * @description Returns the configuration of minimum values (font size and scale ratio) stored in the local storage for a given breakpoint.
   */
  function getMinimumConfig(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }
    return config.min;
  }

  /**
   * @description Returns the min font size from the type scale configuration for the given breakpoint.
   * @param breakpointId
   */
  function getMinFontSize(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }

    return config.min.fontSizeREM;
  }

  /**
   * @description Returns the min scale ratio from the type scale configuration for the given breakpoint.
   * @param breakpointId
   */
  function getMinScaleRatio(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }

    return config.min.scaleRatio;
  }

  /**
   * @description Returns the configuration of maximum values (font size and scale ratio) stored in the local storage for a given breakpoint.
   */
  function getMaximumConfig(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }
    return config.max;
  }

  /**
   * @description Returns the max font size from the type scale configuration for the given breakpoint.
   * @param breakpointId
   */
  function getMaxFontSize(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }

    return config.max.fontSizeREM;
  }

  /**
   * @description Returns the max scale ratio from the type scale configuration for the given breakpoint.
   * @param breakpointId
   */
  function getMaxScaleRatio(breakpointId: BreakpointId) {
    const config = getBreakpointConfig(breakpointId);
    if (!config) {
      return null;
    }

    return config.max.scaleRatio;
  }

  return {
    getBreakpointConfig,
    getMinimumConfig,
    getMaximumConfig,
    getMinFontSize,
    getMaxFontSize,
    getMinScaleRatio,
    getMaxScaleRatio,
    isBreakpointConfigExists,
  };
}
