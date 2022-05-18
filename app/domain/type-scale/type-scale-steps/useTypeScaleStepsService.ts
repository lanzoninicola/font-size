import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { StepId } from "~/context/app/types";

export default function useSelectorsService() {
  const { typeScaleSteps } = useHtmlSelectorsSelector();

  function getSelectorNameById(selectorId: StepId) {
    const selector = typeScaleSteps?.find(
      (selector) => selector.key === selectorId
    );

    return selector?.value;
  }

  return { getSelectorNameById };
}
