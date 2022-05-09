import { useEffect, useState } from "react";
import VStackBox from "~/components/shared/vstack-wrapper";
import BreakpointsPicker from "~/components/type-scale/type-scale-calculator/breakpoints-picker";
import TypeScaleCalculatorForm from "~/components/type-scale/type-scale-calculator/form/type-scale-calculator-form";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleCalculatorRoutes from "~/domain/type-scale-calculator/useTypeScaleCalculatorRoutes";

export default function TypeScaleIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { actions: routeActions } = useTypeScaleCalculatorRoutes();

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      routeActions.NAVIGATE_TO_MISSING_BREAKPOINTS.dispatch();
    } else {
      routeActions.NAVIGATE_TO_CALCULATOR.dispatch();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <VStackBox gap="2rem">
      <BreakpointsPicker />
      {currentBreakpointId !== "" && <TypeScaleCalculatorForm />}
    </VStackBox>
  );
}
