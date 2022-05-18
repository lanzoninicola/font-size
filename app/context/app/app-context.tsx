import { useState } from "react";
import { createContext } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";

import {
  FS_CONTEXT_BREAKPOINTS,
  FS_CONTEXT_MEDIA_QUERIES,
  FS_CONTEXT_TYPESCALE_CONFIG,
  FS_CONTEXT_TYPESCALE_STEPS,
  FS_CONTEXT_TYPOGRAPHY,
} from "./constants";
import useBreakpointsInitialState from "./hooks/useBreakpointsInitialState";
import useTypeScaleStepsInitialState from "./hooks/useTypeScaleStepsInitialState";
import useTypographyInitialState from "./hooks/useTypographyInitialState";

import { AppContext } from "./types/app-context";
import { Breakpoints, BreakpointsProvider } from "./types/breakpoints";
import { MediaQuery } from "./types/media-queries";
import { TypeScaleConfig } from "./types/type-scale-config";
import {
  TypeScaleStepConfig,
  TypeScaleStepProvider,
} from "./types/type-scale-steps";
import { Typography } from "./types/typography";

export const AppContextData = createContext<AppContext>({} as AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { get: getBreakpointsInitialState } = useBreakpointsInitialState();
  const { get: getTypeScaleStepsByProvider } = useTypeScaleStepsInitialState();
  const { get: getTypographyInitialState } = useTypographyInitialState();

  const [pixelsPerRem, setPixelsPerRem] = useState(16);

  // On app load, default breakpoints are loaded
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints>(
    FS_CONTEXT_BREAKPOINTS,
    getBreakpointsInitialState(BreakpointsProvider.default)
  );

  // On app load, default type scale steps are loaded
  const [typeScaleSteps, setTypeScaleSteps] = useLocalStorage<
    TypeScaleStepConfig[]
  >(
    FS_CONTEXT_TYPESCALE_STEPS,
    getTypeScaleStepsByProvider(TypeScaleStepProvider.default)
  );

  const [typeScaleConfig, setTypeScale] = useLocalStorage<TypeScaleConfig[]>(
    FS_CONTEXT_TYPESCALE_CONFIG,
    []
  );

  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQuery[]>(
    FS_CONTEXT_MEDIA_QUERIES,
    []
  );

  const [typography, setTypography] = useLocalStorage<Typography>(
    FS_CONTEXT_TYPOGRAPHY,
    getTypographyInitialState()
  );

  return (
    <AppContextData.Provider
      value={{
        pixelsPerRem,
        typeScaleSteps,
        breakpoints,
        typeScaleConfig,
        mediaQueries,
        typography,
        setPixelsPerRem,
        setTypeScaleSteps,
        setBreakpoints,
        setTypeScale,
        setMediaQueries,
        setTypography,
      }}
    >
      {children}
    </AppContextData.Provider>
  );
}
