import { useState } from "react";
import { createContext } from "use-context-selector";
import {
  BreakpointKey,
  Breakpoints,
  TagMediaQueries,
  Tags,
} from "../interfaces";

export interface FontSizeContext {
  pixelsPerRem: number;
  tag: Tags;
  breakpoints: Breakpoints | null;
  mediaQueries: TagMediaQueries | null;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setTag: (tag: Tags) => void;
  setBreakpoints: (breakpoints: Breakpoints | null) => void;
  setMediaQueries: (mediaQueries: TagMediaQueries | null) => void;
  onMinFontSizeChange: (
    tag: Tags,
    breakpoint: BreakpointKey,
    value: string
  ) => void;
  onMaxFontSizeChange: (
    tag: Tags,
    breakpoint: BreakpointKey,
    value: string
  ) => void;
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

  function onMinFontSizeChange(
    tag: Tags,
    breakpointId: BreakpointKey,
    value: string
  ): void {
    // TODO: make this work with the type annotation of prevState
    // @ts-ignore
    setMediaQueries((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: {
          // @ts-ignore
          ...prevState[tag],
          [breakpointId]: {
            // @ts-ignore
            ...prevState[tag][breakpointId],
            minFontSize: parseInt(value, 10),
          },
        },
      };
    });
  }

  function onMaxFontSizeChange(
    tag: Tags,
    breakpointId: BreakpointKey,
    value: string
  ): void {
    // TODO: make this work with the type annotation of prevState
    // @ts-ignore
    setMediaQueries((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: {
          // @ts-ignore
          ...prevState[tag],
          [breakpointId]: {
            // @ts-ignore
            ...prevState[tag][breakpointId],
            maxFontSize: parseInt(value, 10),
          },
        },
      };
    });
  }

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
        onMinFontSizeChange,
        onMaxFontSizeChange,
      }}
    >
      {children}
    </FontSizeContextData.Provider>
  );
}
