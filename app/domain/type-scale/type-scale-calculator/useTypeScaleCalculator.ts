import { BreakpointId } from "~/context/app/types/breakpoints";
import { MinMaxTypeScaleConfig } from "~/context/app/types/type-scale-config";
import { TypeScaleStepConfig } from "~/context/app/types/type-scale-steps";

import round from "../../utilities/round";

/**
 * Shape of the object that contains the calculation of min and max font-size for the step
 * based on the TypeScaleConfig configuration object.
 * This object is a partial of global MediaQuery object for the step.
 */
interface BreakpointTypeScale {
  breakpointId: BreakpointId;
  // step key of the type scale
  stepKey: string;
  // min font size calculated for the breakpoint
  minFontSize: number;
  // max font size calculated for the breakpoint
  maxFontSize: number;
}

export default function useTypeScaleCalculator() {
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
        minConfig.fontSizeREM * Math.pow(minConfig.scaleRatio, stepPosition)
      )
    );

    const maxFontSize = round(
      Math.min(
        maxConfig.fontSizeREM * Math.pow(maxConfig.scaleRatio, stepPosition)
      )
    );

    return { minFontSize, maxFontSize };
  }

  return {
    calculateBreakpointTypeScale,
  };
}
