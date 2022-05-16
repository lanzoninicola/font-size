import { Divider } from "@chakra-ui/react";
import VStackBox from "~/components/shared/vstack-wrapper";

import BodyFontsPicker from "../../../typography/body-fonts-picker";
import HeadingFontsPicker from "../../../typography/headings-fonts-picker";
import { FormHeading } from "./form-headings";
import GroupMaximum from "./group-maximum";
import GroupMinimum from "./group-minimum";

export default function TypeScaleCalculatorForm() {
  return (
    <VStackBox spacing={5}>
      <Divider />
      <FormHeading>2. Type scale</FormHeading>
      {/* <GroupBaselineStep /> */}
      <GroupMinimum />
      <GroupMaximum />

      <Divider />

      <FormHeading>3. Choose the font</FormHeading>
      <HeadingFontsPicker />
      <BodyFontsPicker />
    </VStackBox>
  );
}
