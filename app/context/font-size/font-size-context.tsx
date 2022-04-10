import { useState } from "react";
import { createContext } from "use-context-selector";
import {
  MinViewportWidthState,
  MaxViewportWidthState,
  MinFontSizeState,
  MaxFontSizeState,
  Tags,
} from "../interfaces";

export interface FontSizeContext {
  pixelsPerRem: number;
  tag: Tags;
  minViewportWidth: MinViewportWidthState;
  maxViewportWidth: MaxViewportWidthState;
  minFontSize: MinFontSizeState;
  maxFontSize: MaxFontSizeState;
  setPixelsPerRem: (pixelsPerRem: number) => void;
  setTag: (tag: Tags) => void;
  onMinViewportWidthChange: (tag: Tags, value: string) => void;
  onMaxViewportWidthChange: (tag: Tags, value: string) => void;
  onMinFontSizeChange: (tag: Tags, value: string) => void;
  onMaxFontSizeChange: (tag: Tags, value: string) => void;
}

export const FontSizeContextData = createContext<FontSizeContext>(
  {} as FontSizeContext
);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [pixelsPerRem, setPixelsPerRem] = useState(16);
  const [tag, setTag] = useState(Tags.h1);
  const [minViewportWidth, setMinViewportWidth] =
    useState<MinViewportWidthState>({
      h1: 512,
      h2: 512,
      h3: 512,
      h4: 512,
      h5: 512,
      h6: 512,
      p: 512,
      caption: 512,
    });
  const [maxViewportWidth, setMaxViewportWidth] =
    useState<MaxViewportWidthState>({
      h1: 840,
      h2: 840,
      h3: 840,
      h4: 840,
      h5: 840,
      h6: 840,
      p: 840,
      caption: 840,
    });
  const [minFontSize, setMinFontSize] = useState<MinFontSizeState>({
    h1: 2.75,
    h2: 2.25,
    h3: 1.75,
    h4: 1.35,
    h5: 1.15,
    h6: 1,
    p: 0.85,
    caption: 0.5,
  });
  const [maxFontSize, setMaxFontSize] = useState<MaxFontSizeState>({
    h1: 3,
    h2: 2.5,
    h3: 1.9,
    h4: 1.5,
    h5: 1.25,
    h6: 1.15,
    p: 1,
    caption: 0.75,
  });

  function onMinViewportWidthChange(tag: Tags, value: string): void {
    setMinViewportWidth((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: parseInt(value, 10),
      };
    });
  }

  function onMaxViewportWidthChange(tag: Tags, value: string): void {
    setMaxViewportWidth((prevState) => {
      if (isNaN(parseInt(value, 10))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: parseInt(value, 10),
      };
    });
  }

  function onMinFontSizeChange(tag: Tags, value: string): void {
    setMinFontSize((prevState) => {
      if (isNaN(parseFloat(value))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: parseFloat(value),
      };
    });
  }

  function onMaxFontSizeChange(tag: Tags, value: string): void {
    setMaxFontSize((prevState) => {
      if (isNaN(parseFloat(value))) {
        value = "0";
      }

      return {
        ...prevState,
        [tag]: parseFloat(value),
      };
    });
  }

  return (
    <FontSizeContextData.Provider
      value={{
        pixelsPerRem,
        tag,
        minViewportWidth,
        maxViewportWidth,
        minFontSize,
        maxFontSize,
        setPixelsPerRem,
        setTag,
        onMinViewportWidthChange,
        onMaxViewportWidthChange,
        onMinFontSizeChange,
        onMaxFontSizeChange,
      }}
    >
      {children}
    </FontSizeContextData.Provider>
  );
}
