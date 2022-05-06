import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";
import useMediaQueriesData from "~/domain/media-queries/useMediaQueriesData";
import useSelectorsData from "~/domain/selectors/useSelectorsData";
import {
  FS_CONTEXT_BREAKPOINTS,
  FS_CONTEXT_MEDIA_QUERIES,
  FS_CONTEXT_SELECTORS,
  FS_CONTEXT_TYPESCALE,
} from "./constants";
import {
  Breakpoints,
  TypeScaleConfig,
  DataProvider,
  MediaQueries,
  Selector,
} from "./interfaces";

export interface AppContext {
  pixelsPerRem: number;
  htmlSelectors: Selector[] | null;
  breakpoints: Breakpoints | null;
  mediaQueries: MediaQueries | null;
  typeScale: TypeScaleConfig[] | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setHtmlSelectors: (htmlSelectors: Selector[] | null) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setMediaQueries: (mediaQueries: MediaQueries | null) => void;
  setTypeScale: (typeScale: TypeScaleConfig[]) => void;
}

export const AppContextData = createContext<AppContext>({} as AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { getByProvider: getBreakpointsByProvider } = useBreakpointsData();
  const { getByProvider: getSelectorsByProvider } = useSelectorsData();

  const [pixelsPerRem, setPixelsPerRem] = useState(16);

  const [htmlSelectors, setHtmlSelectors] = useLocalStorage<Selector[] | null>(
    FS_CONTEXT_SELECTORS,
    getSelectorsByProvider(DataProvider.default)
  );
  const [breakpoints, setBreakpoints] = useLocalStorage<Breakpoints | null>(
    FS_CONTEXT_BREAKPOINTS,
    getBreakpointsByProvider(DataProvider.default)
  );

  const [typeScale, setTypeScale] =
    useLocalStorage<TypeScaleConfig[]>(FS_CONTEXT_TYPESCALE);

  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQueries | null>(
    FS_CONTEXT_MEDIA_QUERIES
  );

  return (
    <AppContextData.Provider
      value={{
        pixelsPerRem,
        htmlSelectors,
        breakpoints,
        typeScale,
        mediaQueries,
        setPixelsPerRem,
        setHtmlSelectors,
        setBreakpoints,
        setTypeScale,
        setMediaQueries,
      }}
    >
      {children}
    </AppContextData.Provider>
  );
}
