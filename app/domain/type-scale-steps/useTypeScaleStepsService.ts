import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { SelectorId } from "~/context/app/interfaces";

export default function useSelectorsService() {
  const { typeScaleSteps } = useHtmlSelectorsSelector();

  function getSelectorNameById(selectorId: SelectorId) {
    const selector = typeScaleSteps?.find(
      (selector) => selector.key === selectorId
    );

    return selector?.value;
  }

  return { getSelectorNameById };
}
