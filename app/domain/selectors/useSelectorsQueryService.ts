import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { Selector } from "~/context/app/interfaces";

type SortOrientation = "ASC" | "DESC";

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
   * @description Get the selectors array sorted by position property ascendant or descendant
   * @param {boolean} [descendant=false]
   */
  function getSelectorsSortByPosition(sort: SortOrientation): Selector[] {
    if (htmlSelectors) {
      if (sort === "ASC") {
        return htmlSelectors.sort((a, b) => a.position - b.position);
      } else {
        return htmlSelectors.sort((a, b) => b.position - a.position);
      }
    }

    return [];
  }

  return {
    isSelectorsEmpty,
    getSelectorsSortByPosition,
  };
}
