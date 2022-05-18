import { useEffect, useState } from "react";
import VStackBox from "~/components/shared/vstack-wrapper";
import TypeScaleCalculatorForm from "~/components/type-scale/type-scale-calculator/form/type-scale-calculator-form";
import GroupBreakpoints from "~/components/type-scale/type-scale-calculator/group-breakpoints";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import GoogleFontsServiceProxy from "~/domain/google-fonts/GoogleFontsServiceProxy";
import { FontFamily } from "~/domain/google-fonts/interfaces";
import useTypeScaleRoutes from "~/domain/type-scale/useTypeScaleRoutes";

export async function loader(): Promise<FontFamily[]> {
  const googleFontsService = new GoogleFontsServiceProxy();
  const googleFontsFamilies = await googleFontsService.findAll();

  return googleFontsFamilies;
}

export default function TypeScaleIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { actions: routeActions } = useTypeScaleRoutes();

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      routeActions.NAVIGATE_TO_MISSING_BREAKPOINTS.dispatch();
    } else {
      routeActions.NAVIGATE_TO_CALCULATOR.dispatch();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <VStackBox gap="2rem">
      <GroupBreakpoints />
      <>
        {currentBreakpointId !== "" && (
          <VStackBox>
            <TypeScaleCalculatorForm />
          </VStackBox>
        )}
      </>
    </VStackBox>
  );
}
