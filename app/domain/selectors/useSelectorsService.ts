import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { SelectorId } from "~/context/app/interfaces";

export default function useSelectorsService() {
  const { htmlSelectors } = useHtmlSelectorsSelector();

  function getSelectorNameById(selectorId: SelectorId) {
    const selector = htmlSelectors?.find(
      (selector) => selector.key === selectorId
    );

    return selector?.value;
  }

  return { getSelectorNameById };
}
