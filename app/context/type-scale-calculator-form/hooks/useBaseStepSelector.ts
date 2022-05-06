import { useEffect } from "react";
import useTypeScaleSelector from "~/context/app/hooks/useTypeScaleSelector";
import { BaseStepFormControl } from "../interfaces";
import { initialState } from "../type-scale-calculator-form-context";
import useTypeScaleCalculatorFormSelector from "./useTypeScaleCalculatorFormSelector";

export default function useBaseStepSelector() {
  const { typeScale, actions: typeScaleActions } = useTypeScaleSelector();
  const { baseStep, setBaseStep } = useTypeScaleCalculatorFormSelector();

  const actions = {
    INIT_BASE_STEP: {
      dispatch: (payload: BaseStepFormControl) => initBaseStep(payload),
    },
    CHANGE_BASE_STEP: {
      dispatch: (payload: BaseStepFormControl) => setBaseStep(payload),
    },
  };

  function initBaseStep(payload: BaseStepFormControl) {
    if (!typeScale) {
      return;
    }

    const typeScaleConfig = typeScale.find(
      (typeScale) => typeScale.breakpointId === payload.breakpointId
    );

    if (typeScaleConfig) {
      setBaseStep(payload);
    } else {
      setBaseStep(initialState.baseStep);
    }
  }

  useEffect(() => {
    console.log(baseStep);
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
