import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointId } from "../breakpoint-builder/interfaces";
import { TypeScaleStepEntityState } from "../app/interfaces";

export interface MediaQueryBuilderContext {
  entityState: TypeScaleStepEntityState;
  currentBreakpointId: BreakpointId;
  currentTypeScaleStepId: string;
  minFontSize: string;
  maxFontSize: string;
  lineHeight: string;
  setEntityState: (entityState: TypeScaleStepEntityState) => void;
  setCurrentBreakpointId: (currentBreakpointId: BreakpointId) => void;
  setCurrentTypeScaleStepId: (currentTypeScaleStepId: string) => void;
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
  const [entityState, setEntityState] = useState<TypeScaleStepEntityState>(
    TypeScaleStepEntityState.idle
  );
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");
  const [currentTypeScaleStepId, setCurrentTypeScaleStepId] =
    useState<string>("");
  const [minFontSize, setMinFontSize] = useState<string>("");
  const [maxFontSize, setMaxFontSize] = useState<string>("");
  const [lineHeight, setLineHeight] = useState<string>("110");

  return (
    <MediaQueryBuilderContextData.Provider
      value={{
        entityState,
        currentBreakpointId,
        currentTypeScaleStepId,
        minFontSize,
        maxFontSize,
        lineHeight,
        setEntityState,
        setCurrentBreakpointId,
        setCurrentTypeScaleStepId,
        setMinFontSize,
        setMaxFontSize,
        setLineHeight,
      }}
    >
      {children}
    </MediaQueryBuilderContextData.Provider>
  );
}
