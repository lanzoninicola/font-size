import { useEffect } from "react";
import FormControlInputSelect from "~/components/shared/form-control-input-select";
import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import useBaseStepSelector from "~/context/type-scale-calculator-form/hooks/useBaseStepSelector";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

export default function GroupBaselineStep() {
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { baseStep, actions } = useBaseStepSelector();
  const { typeScaleSteps } = useHtmlSelectorsSelector();

  function onChangeBaseStep(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    actions.CHANGE_BASE_STEP.dispatch({
      ...baseStep,
      breakpointId: currentBreakpointId,
      step: value,
    });
  }

  function initBaseStep() {
    actions.INIT_BASE_STEP.dispatch({
      ...baseStep,
      breakpointId: currentBreakpointId,
    });
  }

  useEffect(() => {
    initBaseStep();
  }, [currentBreakpointId]);

  return (
    <FormControlInputSelect
      id="baseline"
      size={"sm"}
      orientation="horizontal"
      justify={"space-between"}
      label="Baseline Step"
      defaultValue={baseStep.step}
      minW="200px"
      textAlign="right"
      onChange={onChangeBaseStep}
      isDisabled={true}
    >
      {typeScaleSteps &&
        typeScaleSteps.map((selector, idx) => (
          <option key={idx} value={selector.key}>
            {`${selector.value} (${selector.key})`}
          </option>
        ))}
    </FormControlInputSelect>
  );
}
