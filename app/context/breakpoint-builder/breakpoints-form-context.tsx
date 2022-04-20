import { useState } from "react";
import { createContext } from "use-context-selector";
import { EntityState } from "../shared/interfaces/entity-state";
import { BreakpointId } from "./interfaces";

export interface BreakpointsFormContext {
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

export const BreakpointsFormContextData = createContext<BreakpointsFormContext>(
  {} as BreakpointsFormContext
);

export function BreakpointsFormProvider({
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
    <BreakpointsFormContextData.Provider
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
    </BreakpointsFormContextData.Provider>
  );
}
