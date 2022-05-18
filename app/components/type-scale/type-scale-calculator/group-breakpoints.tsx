import BreakpointsPicker from "~/components/shared/breakpoints-picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import { BreakpointId } from "~/context/app/types/breakpoints";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

import { FormHeading } from "./form/form-headings";

export default function GroupBreakpoints() {
  const { currentBreakpointId, actions: typeScaleCalculatorActions } =
    useCurrentBreakpointIdSelector();
  const { actions: typeScaleConfigActions } = useTypeScaleConfigSelector();

  function onChangeBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const breakpointId = e.target.value as BreakpointId;

    typeScaleCalculatorActions.TYPE_SCALE_CALCULATOR__CHANGE_BREAKPOINT.dispatch(
      breakpointId
    );

    typeScaleConfigActions.TYPESCALE_CONFIG__BREAKPOINT_CHANGE_ON_CALCULATOR.dispatch(
      breakpointId
    );
  }

  return (
    <VStackBox spacing={2}>
      <FormHeading>1. Select a breakpoint</FormHeading>
      <BreakpointsPicker
        size="sm"
        onChange={onChangeBreakpoint}
        value={currentBreakpointId}
      />
    </VStackBox>
  );
}
