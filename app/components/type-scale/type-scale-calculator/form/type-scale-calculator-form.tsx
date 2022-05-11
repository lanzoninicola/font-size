import { Button, Divider, Heading, HStack } from "@chakra-ui/react";
import GoogleFontFamiliesPicker from "~/components/shared/google-font-families-picker";
import GoogleFontVariantsPicker from "~/components/shared/google-font-variants.picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import useTypeScaleCalculatorFormContext from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormContext";
import { TypeScaleConfig } from "~/context/type-scale-calculator-form/interfaces";
import { FormHeading, FormSubHeading } from "./form-headings";

import GroupBaselineStep from "./group-baseline-step";
import GroupBodyFonts from "./group-body-fonts";
import GroupHeadingsFonts from "./group-headings-fonts";
import GroupMaximum from "./group-maximum";
import GroupMinimum from "./group-minimum";

export default function TypeScaleCalculatorForm() {
  const { actions } = useTypeScaleConfigSelector();
  const { actions: mediaQueriesAction } = useMediaQueriesSelector();
  const { currentBreakpointId, baseStep, min, max, fontHeading, fontBody } =
    useTypeScaleCalculatorFormContext();

  function onSaveTypeScaleCalculation() {
    const payload: TypeScaleConfig = {
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
      fontHeading: {
        fontFamily: fontHeading.fontFamily,
        fontWeight: parseInt(fontHeading.fontWeight, 10),
      },
      fontBody: {
        fontFamily: fontBody.fontFamily,
        fontWeight: parseInt(fontBody.fontWeight, 10),
      },
    };

    actions.TYPESCALE_CALCULATOR__SAVE_CONFIG.dispatch(payload);

    mediaQueriesAction.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      payload
    );
  }

  return (
    <VStackBox spacing={5}>
      <Divider />
      <FormHeading>2. Type scale</FormHeading>
      {/* <GroupBaselineStep /> */}
      <GroupMinimum />
      <GroupMaximum />

      <Divider />

      <FormHeading>3. Choose the font</FormHeading>
      <GroupHeadingsFonts />
      <GroupBodyFonts />

      <Button w="100%" bg="secondary.500" onClick={onSaveTypeScaleCalculation}>
        Save
      </Button>
    </VStackBox>
  );
}
