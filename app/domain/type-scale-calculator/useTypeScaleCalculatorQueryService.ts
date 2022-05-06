import { useContext } from "react";
import useTypeScaleSelector from "~/context/app/hooks/useTypeScaleSelector";

import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useTypeScaleCalculatorFormSelector from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormSelector";

export default function useTypeScaleCalculatorQueryService() {
  const { typeScale } = useTypeScaleSelector();
  const { min, setMinimum } = useTypeScaleCalculatorFormSelector();

  function getBreakpointConfig(breakpointId: BreakpointId) {
    if (!typeScale) {
      return null;
    }

    const typeScaleConfig = typeScale.find(
      (typeScale) => typeScale.breakpointId === breakpointId
    );

    return typeScaleConfig;
  }

  function isBreakpointConfigExists(breakpointId: BreakpointId) {
    return !!getBreakpointConfig(breakpointId);
  }

  /**
   * @description Returns the configuration at minimum stored in the local storage for a given breakpoint.
   */
  function getMinimumConfig(breakpointId: BreakpointId) {
    const typeScaleConfig = getBreakpointConfig(breakpointId);
    if (!typeScaleConfig) {
      return null;
    }
    return typeScaleConfig.min;
  }

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
