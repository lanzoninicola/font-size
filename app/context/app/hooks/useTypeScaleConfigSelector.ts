import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";
import { TypeScaleConfig } from "../interfaces";

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
    TYPESCALE_CALCULATOR__SAVE_CONFIG: {
      dispatch: (payload: TypeScaleConfig) => saveTypeScaleConfig(payload),
    },
  };

  function saveTypeScaleConfig(payload: TypeScaleConfig) {
    let nextTypeScale = [] as TypeScaleConfig[];

    if (typeScaleConfig) {
      nextTypeScale = [...typeScaleConfig];
    }

    const index = nextTypeScale.findIndex(
      (typeScaleConfig) => typeScaleConfig.breakpointId === payload.breakpointId
    );

    if (index > -1) {
      nextTypeScale[index] = payload;
    } else {
      nextTypeScale.push(payload);
    }

    setTypeScale(nextTypeScale);
  }

  return {
    typeScaleConfig,
    actions,
  };
}
