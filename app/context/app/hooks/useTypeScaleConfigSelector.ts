import { useContextSelector } from "use-context-selector";
import { DEFAULT_MINMAX_CONFIG } from "~/context/type-scale-calculator-form/constants";
import useTypeScaleQueryService from "~/domain/type-scale/useTypeScaleQueryService";

import { AppContextData } from "../app-context";
import { BreakpointId } from "../types/breakpoints";
import {
  BreakpointMaxFontSize,
  BreakpointMaxScaleRatio,
  BreakpointMinFontSize,
  BreakpointMinScaleRatio,
  TypeScaleConfig,
} from "../types/type-scale-config";
import useMediaQueriesSelector from "./useMediaQueriesSelector";

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

  const { actions: mediaQueriesActions } = useMediaQueriesSelector();

  const actions = {
    TYPESCALE_CONFIG__BREAKPOINT_CHANGE_ON_CALCULATOR: {
      dispatch: (payload: BreakpointId) => handleBreakpointState(payload),
    },
    TYPESCALE_CONFIG__UPDATE_MIN_FONT_SIZE: {
      dispatch: (payload: BreakpointMinFontSize) => changeMinFontSize(payload),
    },
    TYPESCALE_CONFIG__UPDATE_MIN_SCALE_RATIO: {
      dispatch: (payload: BreakpointMinScaleRatio) =>
        changeMinScaleRatio(payload),
    },
    TYPESCALE_CONFIG__UPDATE_MAX_FONT_SIZE: {
      dispatch: (payload: BreakpointMaxFontSize) => changeMaxFontSize(payload),
    },
    TYPESCALE_CONFIG__UPDATE_MAX_SCALE_RATIO: {
      dispatch: (payload: BreakpointMaxScaleRatio) =>
        changeMaxScaleRatio(payload),
    },
  };

  /**
   * @description This function is called when change the breakpoint selected on Type Scale Calculator Form
   * If the configuration for the breakpoint is not found, it will be created with defaults
   */
  function handleBreakpointState(breakpointId: BreakpointId) {
    const breakpointConfig = getBreakpointConfig(breakpointId);

    if (breakpointConfig !== null) {
      return;
    }

    const newBreakpointConfig: TypeScaleConfig = {
      breakpointId,
      min: DEFAULT_MINMAX_CONFIG,
      max: DEFAULT_MINMAX_CONFIG,
    };

    const nextTypeScale = [...typeScaleConfig, newBreakpointConfig];
    setTypeScale(nextTypeScale);

    mediaQueriesActions.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      newBreakpointConfig
    );
  }

  function changeMinFontSize(payload: BreakpointMinFontSize) {
    // get the config for the breakpoint
    const prevBreakpointConfig = getBreakpointConfig(payload.breakpointId);

    if (prevBreakpointConfig === null) {
      return;
    }

    // update the config
    const nextBreakpointConfig: TypeScaleConfig = {
      ...prevBreakpointConfig,
      min: {
        ...prevBreakpointConfig.min,
        fontSizeREM: payload.minFontSizeREM,
      },
    };

    updateState(nextBreakpointConfig);

    // dispatch new config to the media query
    mediaQueriesActions.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      nextBreakpointConfig
    );
  }

  function changeMinScaleRatio(payload: BreakpointMinScaleRatio) {
    // get the config for the breakpoint
    const prevBreakpointConfig = getBreakpointConfig(payload.breakpointId);

    if (prevBreakpointConfig === null) {
      return;
    }

    // update the config
    const nextBreakpointConfig = {
      ...prevBreakpointConfig,
      min: {
        ...prevBreakpointConfig.min,
        scaleRatio: payload.minScaleRatio,
      },
    };

    updateState(nextBreakpointConfig);

    // dispatch new config to the media query
    mediaQueriesActions.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      nextBreakpointConfig
    );
  }

  function changeMaxFontSize(payload: BreakpointMaxFontSize) {
    // get the config for the breakpoint
    const prevBreakpointConfig = getBreakpointConfig(payload.breakpointId);

    if (prevBreakpointConfig === null) {
      return;
    }

    // update the config
    const nextBreakpointConfig: TypeScaleConfig = {
      ...prevBreakpointConfig,
      max: {
        ...prevBreakpointConfig.max,
        fontSizeREM: payload.maxFontSizeREM,
      },
    };

    updateState(nextBreakpointConfig);

    // dispatch new config to the media query
    mediaQueriesActions.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      nextBreakpointConfig
    );
  }

  function changeMaxScaleRatio(payload: BreakpointMaxScaleRatio) {
    // get the config for the breakpoint
    const prevBreakpointConfig = getBreakpointConfig(payload.breakpointId);

    if (prevBreakpointConfig === null) {
      return;
    }

    // update the config
    const nextBreakpointConfig: TypeScaleConfig = {
      ...prevBreakpointConfig,
      max: {
        ...prevBreakpointConfig.max,
        scaleRatio: payload.maxScaleRatio,
      },
    };

    updateState(nextBreakpointConfig);

    // dispatch new config to the media query
    mediaQueriesActions.MEDIA_QUERIES__ON_TYPE_SCALE_CONFIG_CHANGE.dispatch(
      nextBreakpointConfig
    );
  }

  function getBreakpointConfig(
    breakpointId: BreakpointId
  ): TypeScaleConfig | null {
    const prevBreakpointConfig = typeScaleConfig.filter(
      (config) => config.breakpointId === breakpointId
    );

    return prevBreakpointConfig.length > 0 ? prevBreakpointConfig[0] : null;
  }

  function removeBreakpointConfig(breakpointId: BreakpointId) {
    return typeScaleConfig.filter(
      (config) => config.breakpointId !== breakpointId
    );
  }

  function updateState(nextBreakpointConfig: TypeScaleConfig) {
    // build the new state removing the breakpoint config from the state
    const nextTypeScale = removeBreakpointConfig(
      nextBreakpointConfig.breakpointId
    );

    // add the new config to the state
    const nextTypeScaleWithNewConfig = [...nextTypeScale, nextBreakpointConfig];

    // update the state
    setTypeScale(nextTypeScaleWithNewConfig);
  }

  return {
    typeScaleConfig,
    actions,
  };
}
