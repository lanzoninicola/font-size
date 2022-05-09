import { useContextSelector } from "use-context-selector";
import { AppContextData } from "../app-context";

export default function useTypeScaleStepsSelector() {
  const typeScaleSteps = useContextSelector(
    AppContextData,
    (ctx) => ctx?.typeScaleSteps
  );

  const setTypeScaleSteps = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setTypeScaleSteps
  );

  return {
    typeScaleSteps,
    setTypeScaleSteps,
  };
}
