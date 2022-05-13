import { useState } from "react";
import { createContext } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";
import useTypeScaleStepsData from "~/domain/type-scale-steps/useTypeScaleStepsData";
import getTypographyInitialState from "~/domain/typography/getTypographyInitialState";

import {
  FS_CONTEXT_BREAKPOINTS,
  FS_CONTEXT_MEDIA_QUERIES,
  FS_CONTEXT_TYPESCALE_CONFIG,
  FS_CONTEXT_TYPESCALE_STEPS,
  FS_CONTEXT_TYPOGRAPHY,
} from "./constants";
import {
  AppContext,
  Breakpoints,
  DataProvider,
  MediaQuery,
  TypeScaleConfig,
  TypeScaleStepConfig,
  Typography,
} from "./interfaces";

export const AppContextData = createContext<AppContext>({} as AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { getByProvider: getBreakpointsByProvider } = useBreakpointsData();
  const { getByProvider: getTypeScaleStepsByProvider } =
    useTypeScaleStepsData();

  const [pixelsPerRem, setPixelsPerRem] = useState(16);

  // On app load, default breakpoints are loaded
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints>(
    FS_CONTEXT_BREAKPOINTS,
    getBreakpointsByProvider(DataProvider.default)
  );

  // On app load, default type scale steps are loaded
  const [typeScaleSteps, setTypeScaleSteps] = useLocalStorage<
    TypeScaleStepConfig[]
  >(
    FS_CONTEXT_TYPESCALE_STEPS,
    getTypeScaleStepsByProvider(DataProvider.default)
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
