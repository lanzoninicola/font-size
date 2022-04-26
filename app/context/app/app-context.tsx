import { useState } from "react";
import { createContext } from "use-context-selector";

import { Breakpoints } from "../breakpoint-builder/interfaces";
import { MediaQueries, Selectors } from "./interfaces";

export interface AppContext {
  pixelsPerRem: number;
  htmlSelectors: Selectors | null;
  breakpoints: Breakpoints | null;
  mediaQueries: MediaQueries | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setHtmlSelectors: (htmlSelectors: Selectors | null) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setMediaQueries: (mediaQueries: MediaQueries | null) => void;
}

export const AppContextData = createContext<AppContext>({} as AppContext);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  const [htmlSelectors, setHtmlSelectors] = useState<Selectors | null>(null);
  const [breakpoints, setBreakpoints] = useState<Breakpoints | null>(null);
  const [mediaQueries, setMediaQueries] = useState<MediaQueries | null>(null);

  return (
    <AppContextData.Provider
      value={{
        pixelsPerRem,
        htmlSelectors,
        breakpoints,
        mediaQueries,
        setPixelsPerRem,
        setHtmlSelectors,
        setBreakpoints,
        setMediaQueries,
      }}
    >
      {children}
    </AppContextData.Provider>
  );
}
