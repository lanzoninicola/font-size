import { useEffect } from "react";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import { BaseStepFormControl } from "../interfaces";
import { initialState } from "../type-scale-calculator-form-context";
import useTypeScaleCalculatorFormContext from "./useTypeScaleCalculatorFormContext";

export default function useBaseStepSelector() {
  const { typeScaleConfig, actions: typeScaleActions } =
    useTypeScaleConfigSelector();
  const { baseStep, setBaseStep } = useTypeScaleCalculatorFormContext();

  const actions = {
    INIT_BASE_STEP: {
      dispatch: (payload: BaseStepFormControl) => initBaseStep(payload),
    },
    CHANGE_BASE_STEP: {
      dispatch: (payload: BaseStepFormControl) => setBaseStep(payload),
    },
  };

  function initBaseStep(payload: BaseStepFormControl) {
    if (!typeScaleConfig) {
      return;
    }

    const breakpointTypeScaleConfig = typeScaleConfig.find(
      (config) => config.breakpointId === payload.breakpointId
    );

    if (breakpointTypeScaleConfig) {
      setBaseStep(payload);
    } else {
      setBaseStep(initialState.baseStep);
    }
  }

  useEffect(() => {
    if (baseStep === undefined) {
      throw new Error(
        "useBaseStepSelector hook is used outside of the TypeScaleCalculatorFormContext"
      );
    }
  }, []);

  return {
    baseStep,
    actions,
  };
}
