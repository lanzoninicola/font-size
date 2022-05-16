import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";
import { BreakpointId } from "../types/breakpoints";
import { TypeScaleConfig } from "../types/type-scale-config";

export default function useTypeScaleConfigSelector() {
  // This is the state of the type scale configuration made by the user for each breakpoint
  const typeScaleConfig = useContextSelector(
    AppContextData,
    (ctx) => ctx?.typeScaleConfig
  );

  const setTypeScale = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setTypeScale
  );

  const actions = {
    TYPESCALE_CALCULATOR__CHANGE_MIN_FONT_SIZE: {
      dispatch: (payload: BreakpointId) => changeMinFontSize(payload),
    },
    TYPESCALE_CALCULATOR__CHANGE_MIN_SCALE_RATIO: {
      dispatch: (payload: BreakpointId) => changeMinScaleRatio(payload),
    },
    TYPESCALE_CALCULATOR__CHANGE_MAX_FONT_SIZE: {
      dispatch: (payload: BreakpointId) => changeMaxFontSize(payload),
    },
    TYPESCALE_CALCULATOR__CHANGE_MAX_SCALE_RATIO: {
      dispatch: (payload: BreakpointId) => changeMaxScaleRatio(payload),
    },
  };

  function changeMinFontSize(payload: BreakpointId) {}

  function changeMinScaleRatio(payload: BreakpointId) {}

  function changeMaxFontSize(payload: BreakpointId) {}

  function changeMaxScaleRatio(payload: BreakpointId) {}

  // function saveTypeScaleConfig(payload: TypeScaleConfig) {
  //   let nextTypeScale = [] as TypeScaleConfig[];

  //   if (typeScaleConfig) {
  //     nextTypeScale = [...typeScaleConfig];
  //   }

  //   const index = nextTypeScale.findIndex(
  //     (typeScaleConfig) => typeScaleConfig.breakpointId === payload.breakpointId
  //   );

  //   if (index > -1) {
  //     nextTypeScale[index] = payload;
  //   } else {
  //     nextTypeScale.push(payload);
  //   }

  //   setTypeScale(nextTypeScale);
  // }

  return {
    typeScaleConfig,
    actions,
  };
}
