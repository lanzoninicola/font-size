import { useEffect } from "react";
import useTypeScaleCalculatorQueryService from "~/domain/type-scale-calculator/useTypeScaleCalculatorQueryService";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

import { MinMaxConfigFormControl } from "../interfaces";
import { initialState } from "../type-scale-calculator-form-context";
import useTypeScaleCalculatorFormSelector from "./useTypeScaleCalculatorFormSelector";

export default function useMinConfigSelector() {
  const { min, setMinimum } = useTypeScaleCalculatorFormSelector();

  const actions = {
    INIT_MINIMUM_CONFIG: {
      dispatch: (payload: MinMaxConfigFormControl) =>
        initMinimumConfig(payload),
    },
    CHANGE_FONT_SIZE: {
      dispatch: (payload: MinMaxConfigFormControl) => changeFontSize(payload),
    },
    CHANGE_SCALE_RATIO: {
      dispatch: (payload: MinMaxConfigFormControl) => changeScaleRatio(payload),
    },
  };

  const { getMinimumConfig } = useTypeScaleCalculatorQueryService();

  function initMinimumConfig(payload: MinMaxConfigFormControl) {
    const minConfigStored = getMinimumConfig(payload.breakpointId);

    if (minConfigStored) {
      setMinimum({
        breakpointId: payload.breakpointId,
        fontSizeREM: minConfigStored.fontSizeREM,
        scaleRatio: parseDecimalNumber(minConfigStored.scaleRatio),
      });
    } else {
      setMinimum(initialState.min);
    }
  }

  function changeFontSize(payload: MinMaxConfigFormControl) {
    setMinimum(payload);
  }

  function changeScaleRatio(payload: MinMaxConfigFormControl) {
    setMinimum(payload);
  }

  useEffect(() => {
    if (min === undefined) {
      throw new Error(
        "useMinConfigSelector hook is used outside of the TypeScaleCalculatorFormContext"
      );
    }
  }, []);

  return {
    min,
    actions,
  };
}
