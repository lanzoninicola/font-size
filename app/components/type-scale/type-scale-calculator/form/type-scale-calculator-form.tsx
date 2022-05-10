import { Button, Divider, Heading, HStack } from "@chakra-ui/react";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import useTypeScaleCalculatorFormContext from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormContext";

import GroupBaselineStep from "./group-baseline-step";
import GroupHeadingsFonts from "./group-headings-fonts";
import GroupMaximum from "./group-maximum";
import GroupMinimum from "./group-minimum";

export default function TypeScaleCalculatorForm() {
  const { actions } = useTypeScaleConfigSelector();
  const { actions: mediaQueriesAction } = useMediaQueriesSelector();
  const { currentBreakpointId, baseStep, min, max } =
    useTypeScaleCalculatorFormContext();

  function onSaveTypeScaleCalculation() {
    const payload = {
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
    };

    actions.TYPESCALE_CALCULATOR__SAVE_CONFIG.dispatch(payload);

    mediaQueriesAction.MEDIA_QUERY__UPDATE_MEDIAQUERIES_BASED_ON_TYPE_SCALE_CONFIG.dispatch(
      payload
    );
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

      <Heading
        as="h4"
        fontSize={"xs"}
        color="secondary.300"
        textTransform={"uppercase"}
        letterSpacing={1}
      >
        3. Choose the font
      </Heading>

      <VStackBox>
        <GroupHeadingsFonts />
      </VStackBox>
      <Button w="100%" bg="secondary.500" onClick={onSaveTypeScaleCalculation}>
        Save
      </Button>
    </VStackBox>
  );
}
