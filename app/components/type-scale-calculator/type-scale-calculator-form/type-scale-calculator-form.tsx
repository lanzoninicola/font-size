import { Button, Divider, Heading } from "@chakra-ui/react";
import VStackBox from "~/components/shared/vstack-wrapper";
import useTypeScaleSelector from "~/context/app/hooks/useTypeScaleSelector";
import useTypeScaleCalculatorFormSelector from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormSelector";

import GroupBaselineStep from "./group-baseline-step";
import GroupMaximum from "./group-maximum";
import GroupMinimum from "./group-minimum";

export default function TypeScaleCalculatorForm() {
  const { actions } = useTypeScaleSelector();
  const { currentBreakpointId, baseStep, min, max } =
    useTypeScaleCalculatorFormSelector();

  function onSaveTypeScaleCalculation() {
    actions.UPDATE_GLOBAL_STATE.dispatch({
      breakpointId: currentBreakpointId,
      baseStep: baseStep.step,
      min: {
        fontSizeREM: min.fontSizeREM,
        scaleRatio: String(min.scaleRatio),
      },
      max: {
        fontSizeREM: max.fontSizeREM,
        scaleRatio: String(max.scaleRatio),
      },
    });
  }

  return (
    <VStackBox spacing={5}>
      <Heading
        as="h4"
        fontSize={"xs"}
        color="secondary.300"
        textTransform={"uppercase"}
        letterSpacing={1}
      >
        2. Type scale
      </Heading>
      <GroupBaselineStep />
      <Divider />

      <GroupMinimum />
      <GroupMaximum />
      <Button w="100%" bg="secondary.500" onClick={onSaveTypeScaleCalculation}>
        Save
      </Button>
    </VStackBox>
  );
}
