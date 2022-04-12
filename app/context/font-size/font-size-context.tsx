import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointKey, MediaQueries, Tags } from "../interfaces";

export interface FontSizeContext {
  pixelsPerRem: number;
  tag: Tags;
  mediaQueries: MediaQueries;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setTag: (tag: Tags) => void;
  setMediaQueries: (mediaQueries: MediaQueries) => void;
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
  const [mediaQueries, setMediaQueries] = useState({} as MediaQueries);

  function onMinFontSizeChange(
    tag: Tags,
    breakpoint: BreakpointKey,
    value: string
  ): void {
    setMediaQueries((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: {
          ...prevState[tag],
          [breakpoint]: {
            ...prevState[tag][breakpoint],
            minFontSize: parseInt(value, 10),
          },
        },
      };
    });
  }

  function onMaxFontSizeChange(
    tag: Tags,
    breakpoint: BreakpointKey,
    value: string
  ): void {
    setMediaQueries((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: {
          ...prevState[tag],
          [breakpoint]: {
            ...prevState[tag][breakpoint],
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
        mediaQueries,
        setPixelsPerRem,
        setTag,
        setMediaQueries,
        onMinFontSizeChange,
        onMaxFontSizeChange,
      }}
    >
      {children}
    </FontSizeContextData.Provider>
  );
}
