import { useState } from "react";
import { createContext } from "use-context-selector";
import { EntityState } from "../shared/interfaces/entity-state";
import { BreakpointId } from "./interfaces";

export interface BreakpointsBuilderContext {
  entityState: EntityState;
  currentBreakpointId: BreakpointId;
  minWidth: string;
  maxWidth: string;
  label: string;
  setEntityState: (entityState: EntityState) => void;
  setCurrentBreakpointId: (currentBreakpointId: BreakpointId) => void;
  setMinWidth: (minWidth: string) => void;
  setMaxWidth: (maxWidth: string) => void;
  setLabel: (label: string) => void;
}

export const BreakpointsBuilderContextData =
  createContext<BreakpointsBuilderContext>({} as BreakpointsBuilderContext);

export function BreakpointsBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entityState, setEntityState] = useState<EntityState>(EntityState.idle);
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");
  const [minWidth, setMinWidth] = useState<string>("");
  const [maxWidth, setMaxWidth] = useState<string>("");
  const [label, setLabel] = useState<string>("...");

  return (
    <BreakpointsBuilderContextData.Provider
      value={{
        entityState,
        currentBreakpointId,
        minWidth,
        maxWidth,
        label,
        setEntityState,
        setCurrentBreakpointId,
        setMinWidth,
        setMaxWidth,
        setLabel,
      }}
    >
      {children}
    </BreakpointsBuilderContextData.Provider>
  );
}
