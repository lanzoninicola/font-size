import { useState } from "react";
import { createContext } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";
import useTypeScaleStepsData from "~/domain/type-scale-steps/useTypeScaleStepsData";

import {
  FS_CONTEXT_BREAKPOINTS,
  FS_CONTEXT_MEDIA_QUERIES,
  FS_CONTEXT_TYPESCALE_CONFIG,
  FS_CONTEXT_TYPESCALE_STEPS,
} from "./constants";
import {
  AppContext,
  Breakpoints,
  DataProvider,
  MediaQuery,
  TypeScaleConfig,
  TypeScaleStepConfig,
} from "./interfaces";

export const AppContextData = createContext<AppContext>({} as AppContext);

export const mediaQueryInitialStatePartial: Omit<
  MediaQuery,
  "breakpointId" | "stepId"
> = {
  minFontSize: 1,
  maxFontSize: 1,
  lineHeight: 120,
  marginBottom: 1,
  fontFamily: "Open Sans",
  fontWeight: 400,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { getByProvider: getBreakpointsByProvider } = useBreakpointsData();
  const { getByProvider: getTypeScaleStepsByProvider } =
    useTypeScaleStepsData();

  const [pixelsPerRem, setPixelsPerRem] = useState(16);

  // On app load, default breakpoints are loaded
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints | null>(
    FS_CONTEXT_BREAKPOINTS,
    getBreakpointsByProvider(DataProvider.default)
  );

  // On app load, default type scale steps are loaded
  const [typeScaleSteps, setTypeScaleSteps] = useLocalStorage<
    TypeScaleStepConfig[] | null
  >(
    FS_CONTEXT_TYPESCALE_STEPS,
    getTypeScaleStepsByProvider(DataProvider.default)
  );

  const [typeScaleConfig, setTypeScale] = useLocalStorage<TypeScaleConfig[]>(
    FS_CONTEXT_TYPESCALE_CONFIG
  );

  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQuery[] | null>(
    FS_CONTEXT_MEDIA_QUERIES
  );

  return (
    <AppContextData.Provider
      value={{
        pixelsPerRem,
        typeScaleSteps,
        breakpoints,
        typeScaleConfig,
        mediaQueries,
        setPixelsPerRem,
        setTypeScaleSteps,
        setBreakpoints,
        setTypeScale,
        setMediaQueries,
      }}
    >
      {children}
    </AppContextData.Provider>
  );
}
