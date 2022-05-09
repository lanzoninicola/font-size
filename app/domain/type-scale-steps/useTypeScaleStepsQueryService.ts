import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/interfaces";

type SortOrientation = "ASC" | "DESC";

export default function useTypeScaleStepsQueryService() {
  const { typeScaleSteps } = useHtmlSelectorsSelector();

  /**
   * @description Check if the global Selectors array is empty
   * @returns {boolean}
   */
  function isSelectorsEmpty() {
    console.log(typeScaleSteps);

    if (typeScaleSteps) {
      return typeScaleSteps.length === 0;
    }

    return true;
  }

  /**
   * @description Get the selectors array sorted by position property ascendant or descendant
   * @param {boolean} [descendant=false]
   */
  function getTypeScaleStepsSortedByPosition(
    sort: SortOrientation
  ): TypeScaleStepConfig[] {
    if (typeScaleSteps) {
      if (sort === "ASC") {
        return typeScaleSteps.sort((a, b) => a.position - b.position);
      } else {
        return typeScaleSteps.sort((a, b) => b.position - a.position);
      }
    }

    return [];
  }

  return {
    isSelectorsEmpty,
    getTypeScaleStepsSortedByPosition,
  };
}
