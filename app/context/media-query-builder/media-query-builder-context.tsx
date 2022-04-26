import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointId } from "../breakpoint-builder/interfaces";
import { SelectorId } from "../app/interfaces";
import { SelectorEntityState } from "../shared/interfaces/entity-state";

export interface MediaQueryBuilderContext {
  entityState: SelectorEntityState;
  currentBreakpointId: BreakpointId;
  currentSelectorId: string;
  minFontSize: string;
  maxFontSize: string;
  lineHeight: string;
  setEntityState: (entityState: SelectorEntityState) => void;
  setCurrentBreakpointId: (currentBreakpointId: BreakpointId) => void;
  setCurrentSelector: (currentSelectorId: string) => void;
  setMinFontSize: (minFontSize: string) => void;
  setMaxFontSize: (maxFontSize: string) => void;
  setLineHeight: (lineHeight: string) => void;
}

export const MediaQueryBuilderContextData =
  createContext<MediaQueryBuilderContext>({} as MediaQueryBuilderContext);

export function MediaQueryBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entityState, setEntityState] = useState<SelectorEntityState>(
    SelectorEntityState.idle
  );
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");
  const [currentSelectorId, setCurrentSelector] = useState<SelectorId>("");
  const [minFontSize, setMinFontSize] = useState<string>("");
  const [maxFontSize, setMaxFontSize] = useState<string>("");
  const [lineHeight, setLineHeight] = useState<string>("");

  return (
    <MediaQueryBuilderContextData.Provider
      value={{
        entityState,
        currentBreakpointId,
        currentSelectorId,
        minFontSize,
        maxFontSize,
        lineHeight,
        setEntityState,
        setCurrentBreakpointId,
        setCurrentSelector,
        setMinFontSize,
        setMaxFontSize,
        setLineHeight,
      }}
    >
      {children}
    </MediaQueryBuilderContextData.Provider>
  );
}
