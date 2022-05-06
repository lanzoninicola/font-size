import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleSelector";
import useTypeScaleCalculatorFormSelector from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormSelector";

import useMediaQueriesBuilderService from "../media-queries/useMediaQueriesBuilderService";
import useMediaQueriesService from "../media-queries/useMediaQueriesService";
import useTypeScaleCalculatorQueryService from "./useTypeScaleCalculatorQueryService";

export default function useTypeScaleCalculatorDataService() {
  const { currentBreakpointId: breakpointId } = useMediaQueriesBuilderService();
  const { baseStep, min, max } = useTypeScaleCalculatorFormSelector();
  const { typeScale, setTypeScale } = useTypeScaleConfigSelector();
  const { isBreakpointConfigExists } = useTypeScaleCalculatorQueryService();
  const {} = useMediaQueriesService();

  function save() {
    saveTypeScaleConfig();
  }

  function saveTypeScaleConfig() {
    if (!typeScale) {
      return;
    }

    const nextTypeScale = [...typeScale];

    if (isBreakpointConfigExists(breakpointId)) {
      const newTypeScale = nextTypeScale.map((typeScale) => {
        if (typeScale.breakpointId === breakpointId) {
          typeScale.baseStep = baseStep.step;
          typeScale.min = {
            fontSizeREM: min.fontSizeREM,
            scaleRatio: String(min.scaleRatio),
          };
          typeScale.max = {
            fontSizeREM: max.fontSizeREM,
            scaleRatio: String(max.scaleRatio),
          };
        }

        return typeScale;
      });

      setTypeScale(newTypeScale);
      return;
    }

    const newTypeScale = [
      ...nextTypeScale,
      {
        breakpointId,
        baseStep: baseStep.step,
        min: {
          fontSizeREM: min.fontSizeREM,
          scaleRatio: String(min.scaleRatio),
        },
        max: {
          fontSizeREM: max.fontSizeREM,
          scaleRatio: String(max.scaleRatio),
        },
      },
    ];
    setTypeScale(newTypeScale);
  }

  return {
    save,
  };
}
