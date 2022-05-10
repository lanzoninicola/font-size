import { useEffect } from "react";
import useTypeScaleCalculatorQueryService from "~/domain/type-scale-calculator/useTypeScaleCalculatorQueryService";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

import { MinMaxConfigFormControl } from "../interfaces";
import { initialState } from "../type-scale-calculator-form-context";
import useTypeScaleCalculatorFormContext from "./useTypeScaleCalculatorFormContext";

export default function useMaxConfigSelector() {
  const { max, setMaximum } = useTypeScaleCalculatorFormContext();

  const actions = {
    INIT_MAXIMUM_CONFIG: {
      dispatch: (payload: MinMaxConfigFormControl) =>
        initMaximumConfig(payload),
    },
    CHANGE_FONT_SIZE: {
      dispatch: (payload: MinMaxConfigFormControl) => changeFontSize(payload),
    },

    CHANGE_SCALE_RATIO: {
      dispatch: (payload: MinMaxConfigFormControl) => changeScaleRatio(payload),
    },
  };

  const { getMaximumConfig } = useTypeScaleCalculatorQueryService();

  function initMaximumConfig(payload: MinMaxConfigFormControl) {
    const maxConfigStored = getMaximumConfig(payload.breakpointId);

    if (maxConfigStored) {
      setMaximum({
        breakpointId: payload.breakpointId,
        fontSizeREM: maxConfigStored.fontSizeREM,
        scaleRatio: parseDecimalNumber(maxConfigStored.scaleRatio),
      });
    } else {
      setMaximum(initialState.max);
    }
  }

  function changeFontSize(payload: MinMaxConfigFormControl) {
    setMaximum(payload);
  }

  function changeScaleRatio(payload: MinMaxConfigFormControl) {
    setMaximum(payload);
  }

  useEffect(() => {
    if (max === undefined) {
      throw new Error(
        "useMaxConfigSelector hook is used outside of the TypeScaleCalculatorFormContext"
      );
    }
  }, []);

  return {
    max,
    actions,
  };
}
