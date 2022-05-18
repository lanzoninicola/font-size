import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointId } from "../app/types/breakpoints";
import { TypeScaleStepEntityState } from "../app/types/type-scale-steps";
import { MediaQuery } from "./interfaces/media-query";

export interface MediaQueryBuilderContext {
  entityState: TypeScaleStepEntityState;
  currentBreakpointId: BreakpointId;
  currentTypeScaleStepId: string;
  minFontSize: string;
  maxFontSize: string;
  lineHeight: string;
  marginBottom: string;
  setEntityState: (entityState: TypeScaleStepEntityState) => void;
  setCurrentBreakpointId: (currentBreakpointId: BreakpointId) => void;
  setCurrentTypeScaleStepId: (currentTypeScaleStepId: string) => void;
  setMinFontSize: (minFontSize: string) => void;
  setMaxFontSize: (maxFontSize: string) => void;
  setLineHeight: (lineHeight: string) => void;
  setMarginBottom: (marginBottom: string) => void;
}

export const mediaQueryInitialStatePartial: Omit<
  MediaQuery,
  "breakpointId" | "stepId"
> = {
  minFontSize: 1,
  maxFontSize: 1,
  lineHeight: 120,
  marginBottom: 1,
};

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
  const [marginBottom, setMarginBottom] = useState<string>("");

  return (
    <MediaQueryBuilderContextData.Provider
      value={{
        entityState,
        currentBreakpointId,
        currentTypeScaleStepId,
        minFontSize,
        maxFontSize,
        lineHeight,
        marginBottom,
        setEntityState,
        setCurrentBreakpointId,
        setCurrentTypeScaleStepId,
        setMinFontSize,
        setMaxFontSize,
        setLineHeight,
        setMarginBottom,
      }}
    >
      {children}
    </MediaQueryBuilderContextData.Provider>
  );
}
