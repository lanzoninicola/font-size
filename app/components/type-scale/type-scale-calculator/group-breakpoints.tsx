import { Heading } from "@chakra-ui/react";
import BreakpointsPicker from "~/components/shared/breakpoints-picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

export default function GroupBreakpoints() {
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
      <BreakpointsPicker
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          actions.TYPE_SCALE_CALCULATOR__CHANGE_BREAKPOINT.dispatch(
            e.target.value
          )
        }
        value={currentBreakpointId}
      />
    </VStackBox>
  );
}
