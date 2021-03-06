import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import {
  BreakpointTypeScale,
  MinMaxTypeScaleConfig,
} from "~/context/type-scale-calculator-form/interfaces";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/interfaces";
import parseDecimalNumber from "../utilities/parseDecimalNumber";
import round from "../utilities/round";

export default function useTypeScaleCalculatorUtils() {
  /**
   *
   * @param breakpointId - Breakpoint id
   * @param min minFontSize and scaleRatio values chosen in the type scale calculator form by the user
   * @param max maxFontSize and scaleRatio values chosen in the type scale calculator form by the user
   * @param typeScaleSteps - Type scale steps configuration: this include the step position info that is used to determine the min and max font size
   *
   * @returns {array} - An array of min and max font size for each step of type scale for the given breakpoint
   */
  function calculateBreakpointTypeScale(
    breakpointId: BreakpointId,
    min: MinMaxTypeScaleConfig,
    max: MinMaxTypeScaleConfig,
    steps: TypeScaleStepConfig[]
  ): BreakpointTypeScale[] {
    //  for each type scale step
    return steps.map((step) => {
      // calculate the min and max font size based on the type scale configuration
      const { minFontSize, maxFontSize } = calculateStepMinMaxFontSize(
        min,
        max,
        step.position
      );

      // push the media query object for the breakpoint with the new values
      return {
        breakpointId,
        stepKey: step.key,
        minFontSize,
        maxFontSize,
      };
    });
  }

  /**
   *
   * minFontSize = minFontSize * (scaleRatio ^ (stepPosition))
   * maxFontSize = maxFontSize * (scaleRatio ^ (stepPosition))
   *
   * @param minConfig minFontSize and scaleRatio values chosen in the type scale calculator form by the user
   * @param maxConfig maxFontSize and scaleRatio values chosen in the type scale calculator form by the user
   * @param stepPosition step position
   * @returns min and max font size for the step calculated based on position and scaleRatio
   */

  function calculateStepMinMaxFontSize(
    minConfig: MinMaxTypeScaleConfig,
    maxConfig: MinMaxTypeScaleConfig,
    stepPosition: number
  ) {
    const minFontSize = round(
      Math.min(
        parseDecimalNumber(minConfig.fontSizeREM) *
          Math.pow(parseDecimalNumber(minConfig.scaleRatio), stepPosition)
      )
    );

    const maxFontSize = round(
      Math.min(
        parseDecimalNumber(maxConfig.fontSizeREM) *
          Math.pow(parseDecimalNumber(maxConfig.scaleRatio), stepPosition)
      )
    );

    return { minFontSize, maxFontSize };
  }

  return {
    calculateBreakpointTypeScale,
  };
}
