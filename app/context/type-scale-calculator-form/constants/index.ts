import { PickerOption } from "~/components/shared/types";
import { MinMaxTypeScaleConfig } from "~/context/app/types/type-scale-config";

/** Default option value for the breakpoint picker */
export const DEFAULT_BREAKPOINT_PICKER_OPTION: PickerOption = {
  value: "",
  label: " --- Choose a breakpoint --- ",
};

/** Default value for the min and max configuration in the TypeScale Calculator */
export const DEFAULT_MINMAX_CONFIG: MinMaxTypeScaleConfig = {
  fontSizeREM: 1,
  scaleRatio: 1.067,
};
