import { useState } from "react";
import { createContext } from "use-context-selector";
import { BreakpointId } from "../app/types/breakpoints";

import { TypeScaleCalculatorFormContext } from "./types";

export const TypeScaleCalculatorFormContextData =
  createContext<TypeScaleCalculatorFormContext>(
    {} as TypeScaleCalculatorFormContext
  );

export function TypeScaleCalculatorFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");

  return (
    <TypeScaleCalculatorFormContextData.Provider
      value={{
        currentBreakpointId,
        setCurrentBreakpointId,
      }}
    >
      {children}
    </TypeScaleCalculatorFormContextData.Provider>
  );
}
