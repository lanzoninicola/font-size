import { useContextSelector } from "use-context-selector";
import { TypeScaleCalculatorFormContextData } from "../type-scale-calculator-form-context";

export default function useTypeScaleCalculatorFormContext() {
  const currentBreakpointId = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.currentBreakpointId
  );

  const setCurrentBreakpointId = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setCurrentBreakpointId
  );

  const baseStep = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.baseStep
  );

  const setBaseStep = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setBaseStep
  );

  const max = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.max
  );

  const setMaximum = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setMaximum
  );

  const min = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.min
  );

  const setMinimum = useContextSelector(
    TypeScaleCalculatorFormContextData,
    (ctx) => ctx?.setMinimum
  );

  return {
    currentBreakpointId,
    setCurrentBreakpointId,
    baseStep,
    setBaseStep,
    min,
    setMinimum,
    max,
    setMaximum,
  };
}
