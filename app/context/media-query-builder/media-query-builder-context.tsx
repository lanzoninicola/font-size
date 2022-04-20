import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointId } from "../breakpoint-builder/interfaces";
import { Selector } from "../font-size/interfaces";
import { EntityState } from "../shared/interfaces/entity-state";

export interface MediaQueryBuilderContext {
  entityState: EntityState;
  currentBreakpointId: BreakpointId;
  currentSelector: string;
  minFontSize: string;
  maxFontSize: string;

  setEntityState: (entityState: EntityState) => void;
  setCurrentBreakpointId: (currentBreakpointId: BreakpointId) => void;
  setCurrentSelector: (currentSelector: string) => void;
  setMinFontSize: (minFontSize: string) => void;
  setMaxFontSize: (maxFontSize: string) => void;
}

export const MediaQueryBuilderContextData =
  createContext<MediaQueryBuilderContext>({} as MediaQueryBuilderContext);

export function MediaQueryBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entityState, setEntityState] = useState<EntityState>(EntityState.idle);
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");
  const [currentSelector, setCurrentSelector] = useState<Selector>("");
  const [minFontSize, setMinFontSize] = useState<string>("");
  const [maxFontSize, setMaxFontSize] = useState<string>("");

  return (
    <MediaQueryBuilderContextData.Provider
      value={{
        entityState,
        currentBreakpointId,
        currentSelector,
        minFontSize,
        maxFontSize,
        setEntityState,
        setCurrentBreakpointId,
        setCurrentSelector,
        setMinFontSize,
        setMaxFontSize,
      }}
    >
      {children}
    </MediaQueryBuilderContextData.Provider>
  );
}
