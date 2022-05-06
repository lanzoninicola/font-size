import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormControlSelectBreakpoint from "~/components/shared/form-control-select-breakpoint";
import VStackBox from "~/components/shared/vstack-wrapper";
import TypeScaleCalculatorForm from "~/components/type-scale-calculator/type-scale-calculator-form/type-scale-calculator-form";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleCalculatorRoutes from "~/domain/type-scale-calculator/useTypeScaleCalculatorRoutes";

export default function TypeScaleIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const { actions: routeActions } = useTypeScaleCalculatorRoutes();
  const { currentBreakpointId, actions } = useCurrentBreakpointIdSelector();

  function onChangeCurrentBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    actions.CHANGE_CURRENT_BREAKPOINT.dispatch(bp);
  }

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      routeActions.NAVIGATE_TO_MISSING_BREAKPOINTS.dispatch();
    } else {
      routeActions.NAVIGATE_TO_CALCULATOR.dispatch();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <VStackBox gap="2rem">
      <VStackBox spacing={2}>
        <Heading
          as="h4"
          fontSize={"xs"}
          color="secondary.300"
          textTransform={"uppercase"}
          letterSpacing={1}
        >
          1. Select a breakpoint
        </Heading>
        <FormControlSelectBreakpoint
          onChange={onChangeCurrentBreakpoint}
          value={currentBreakpointId}
        />
      </VStackBox>

      {currentBreakpointId !== "" && (
        <>
          <TypeScaleCalculatorForm />
        </>
      )}
    </VStackBox>
  );
}
