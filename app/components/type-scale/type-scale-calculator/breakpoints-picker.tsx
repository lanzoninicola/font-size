import { Heading } from "@chakra-ui/react";
import FormControlSelectBreakpoint from "~/components/shared/form-control-select-breakpoint";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

export default function BreakpointsPicker() {
  const { currentBreakpointId, actions } = useCurrentBreakpointIdSelector();

  return (
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          actions.CHANGE_CURRENT_BREAKPOINT.dispatch(e.target.value)
        }
        value={currentBreakpointId}
      />
    </VStackBox>
  );
}
