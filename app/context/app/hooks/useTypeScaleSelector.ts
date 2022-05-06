import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";
import { TypeScaleConfig } from "../interfaces";

export default function useTypeScaleSelector() {
  // This is the state of the type scale configuration made by the user for each breakpoint
  const typeScale = useContextSelector(AppContextData, (ctx) => ctx?.typeScale);

  const setTypeScale = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setTypeScale
  );

  const actions = {
    UPDATE_GLOBAL_STATE: {
      dispatch: (payload: TypeScaleConfig) => updateGlobalState(payload),
    },
  };

  function updateGlobalState(payload: TypeScaleConfig) {
    let nextTypeScale = [] as TypeScaleConfig[];

    if (typeScale) {
      nextTypeScale = [...typeScale];
    }

    const index = nextTypeScale.findIndex(
      (typeScale) => typeScale.breakpointId === payload.breakpointId
    );

    if (index > -1) {
      nextTypeScale[index] = payload;
    } else {
      nextTypeScale.push(payload);
    }

    setTypeScale(nextTypeScale);
  }

  return {
    typeScale,
    actions,
  };
}
