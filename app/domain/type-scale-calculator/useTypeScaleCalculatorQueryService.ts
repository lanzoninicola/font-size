import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

export default function useTypeScaleCalculatorQueryService() {
  const { typeScaleConfig } = useTypeScaleConfigSelector();

  function getBreakpointConfig(breakpointId: BreakpointId) {
    if (!typeScaleConfig) {
      return null;
    }

    const breakpointTypeScaleConfig = typeScaleConfig.find(
      (config) => config.breakpointId === breakpointId
    );

    return breakpointTypeScaleConfig;
  }

  function isBreakpointConfigExists(breakpointId: BreakpointId) {
    return !!getBreakpointConfig(breakpointId);
  }

  /**
   * @description Returns the configuration of minimum values (font size and scale ratio) stored in the local storage for a given breakpoint.
   */
  function getMinimumConfig(breakpointId: BreakpointId) {
    const typeScaleConfig = getBreakpointConfig(breakpointId);
    if (!typeScaleConfig) {
      return null;
    }
    return typeScaleConfig.min;
  }

  /**
   * @description Returns the configuration of maximum values (font size and scale ratio) stored in the local storage for a given breakpoint.
   */
  function getMaximumConfig(breakpointId: BreakpointId) {
    const typeScaleConfig = getBreakpointConfig(breakpointId);
    if (!typeScaleConfig) {
      return null;
    }
    return typeScaleConfig.max;
  }

  return {
    getBreakpointConfig,
    getMinimumConfig,
    getMaximumConfig,
    isBreakpointConfigExists,
  };
}
