import { useState } from "react";
import { createContext } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";

import { FS_CONTEXT_BREAKPOINTS, FS_CONTEXT_MEDIA_QUERIES } from "../constants";
import { Breakpoints, TagMediaQueries, Tags } from "../interfaces";

export interface FontSizeContext {
  pixelsPerRem: number;
  tag: Tags;
  breakpoints: Breakpoints | null;
  mediaQueries: TagMediaQueries | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setTag: (tag: Tags) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setMediaQueries: (mediaQueries: TagMediaQueries | null) => void;
}

export const FontSizeContextData = createContext<FontSizeContext>(
  {} as FontSizeContext
);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  const [tag, setTag] = useState(Tags.h1);
  const [breakpoints, setBreakpoints] = useState<Breakpoints | null>(null);
  const [mediaQueries, setMediaQueries] = useState<TagMediaQueries | null>(
    null
  );

  return (
    <FontSizeContextData.Provider
      value={{
        pixelsPerRem,
        tag,
        breakpoints,
        mediaQueries,
        setPixelsPerRem,
        setTag,
        setBreakpoints,
        setMediaQueries,
      }}
    >
      {children}
    </FontSizeContextData.Provider>
  );
}
