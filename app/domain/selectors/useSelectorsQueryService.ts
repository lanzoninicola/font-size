import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { Selectors } from "~/context/app/interfaces";

type OrderOrientation = "ASC" | "DESC";

export default function useSelectorsQueryService() {
  const { htmlSelectors } = useHtmlSelectorsSelector();

  /**
   * @description Check if the global Selectors array is empty
   * @returns {boolean}
   */
  function isSelectorsEmpty() {
    console.log(htmlSelectors);

    if (htmlSelectors) {
      return htmlSelectors.length === 0;
    }

    return true;
  }

  /**
   * @description Get the selectors array ordered by order property ascendant or descendant
   * @param {boolean} [descendant=false]
   */
  function getSelectorsSortByOrder(order: OrderOrientation): Selectors {
    if (htmlSelectors) {
      if (order === "ASC") {
        return htmlSelectors.sort((a, b) => a.order - b.order);
      } else {
        return htmlSelectors.sort((a, b) => b.order - a.order);
      }
    }

    return [];
  }

  return {
    isSelectorsEmpty,
    getSelectorsSortByOrder,
  };
}
