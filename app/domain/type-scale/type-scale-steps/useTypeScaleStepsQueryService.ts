import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/types";

type SortOrientation = "ASC" | "DESC";

export default function useTypeScaleStepsQueryService() {
  const { typeScaleSteps } = useHtmlSelectorsSelector();

  /**
   * @description Check if the global Steps array is empty
   * @returns {boolean}
   */
  function isTypeScaleStepsEmpty() {
    return typeScaleSteps.length === 0;
  }

  /**
   * @description Get the steps array sorted by position property ascendant or descendant
   * @param {boolean} [descendant=false]
   */
  function getStepsSortedByPosition(
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

  /**
   * @description Get the headings steps
   * @returns {TypeScaleStepConfig[]}
   */
  function getHeadersSteps() {
    return typeScaleSteps.filter((step) => step.isHeading === true);
  }

  /**
   * @description Get the body steps
   * @returns {TypeScaleStepConfig[]}
   */
  function getBodySteps() {
    return typeScaleSteps.filter((step) => step.isHeading === false);
  }

  return {
    isTypeScaleStepsEmpty,
    getStepsSortedByPosition,
    getHeadersSteps,
    getBodySteps,
  };
}
