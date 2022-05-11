import BreakpointsPicker from "~/components/shared/breakpoints-picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

import { FormHeading } from "./form/form-headings";

export default function GroupBreakpoints() {
  const { currentBreakpointId, actions } = useCurrentBreakpointIdSelector();

  function onChangeBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    actions.TYPE_SCALE_CALCULATOR__CHANGE_BREAKPOINT.dispatch(e.target.value);
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
