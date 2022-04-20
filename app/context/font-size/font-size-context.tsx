import { useState } from "react";
import { createContext } from "use-context-selector";
import { Breakpoints } from "../breakpoint-builder/interfaces";

import { MediaQueries, Selector } from "./interfaces";

export interface FontSizeContext {
  pixelsPerRem: number;
  selector: Selector | null;
  breakpoints: Breakpoints | null;
  mediaQueries: MediaQueries | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setSelector: (selector: Selector | null) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setMediaQueries: (mediaQueries: MediaQueries | null) => void;
}

export const FontSizeContextData = createContext<FontSizeContext>(
  {} as FontSizeContext
);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  const [selector, setSelector] = useState<Selector | null>(null);
  const [breakpoints, setBreakpoints] = useState<Breakpoints | null>(null);
  const [mediaQueries, setMediaQueries] = useState<MediaQueries | null>(null);

  return (
    <FontSizeContextData.Provider
      value={{
        pixelsPerRem,
        selector,
        breakpoints,
        mediaQueries,
        setPixelsPerRem,
        setSelector,
        setBreakpoints,
        setMediaQueries,
      }}
    >
      {children}
    </FontSizeContextData.Provider>
  );
}
