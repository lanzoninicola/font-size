import { useState } from "react";
import { createContext } from "use-context-selector";
import { HTMLTags } from "../app/interfaces";

import { BreakpointId } from "../breakpoint-builder/interfaces";
import {
  BaseStepFormControl,
  FontConfigFormControl,
  MinMaxConfigFormControl,
} from "./interfaces";

export interface TypeScaleCalculatorFormContext {
  currentBreakpointId: BreakpointId;
  baseStep: BaseStepFormControl;
  min: MinMaxConfigFormControl;
  max: MinMaxConfigFormControl;
  fontHeading: FontConfigFormControl;
  fontBody: FontConfigFormControl;
  setCurrentBreakpointId: (breakpointId: BreakpointId) => void;
  setBaseStep: (baseStep: BaseStepFormControl) => void;
  setMinimum: (min: MinMaxConfigFormControl) => void;
  setMaximum: (max: MinMaxConfigFormControl) => void;
  setFontHeading: (font: FontConfigFormControl) => void;
  setFontBody: (font: FontConfigFormControl) => void;
}

export const TypeScaleCalculatorFormContextData =
  createContext<TypeScaleCalculatorFormContext>(
    {} as TypeScaleCalculatorFormContext
  );

export const initialState: Omit<
  TypeScaleCalculatorFormContext,
  | "setCurrentBreakpointId"
  | "setBaseStep"
  | "setMinimum"
  | "setMaximum"
  | "setFontHeading"
  | "setFontBody"
> = {
  currentBreakpointId: "",
  baseStep: {
    breakpointId: "",
    step: HTMLTags.p,
  },
  min: {
    breakpointId: "",
    fontSizeREM: "1",
    scaleRatio: 1.067,
  },
  max: {
    breakpointId: "",
    fontSizeREM: "1",
    scaleRatio: 1.067,
  },
  fontHeading: {
    breakpointId: "",
    fontFamily: "Open Sans",
    fontWeight: "400",
  },
  fontBody: {
    breakpointId: "",
    fontFamily: "Open Sans",
    fontWeight: "400",
  },
};

export function TypeScaleCalculatorFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentBreakpointId, setCurrentBreakpointId] =
    useState<BreakpointId>("");
  const [baseStep, setBaseStep] = useState<BaseStepFormControl>(
    initialState.baseStep
  );
  const [min, setMinimum] = useState<MinMaxConfigFormControl>(initialState.min);
  const [max, setMaximum] = useState<MinMaxConfigFormControl>(initialState.max);
  const [fontHeading, setFontHeading] = useState<FontConfigFormControl>(
    initialState.fontHeading
  );
  const [fontBody, setFontBody] = useState<FontConfigFormControl>(
    initialState.fontBody
  );

  return (
    <TypeScaleCalculatorFormContextData.Provider
      value={{
        currentBreakpointId,
        baseStep,
        min,
        max,
        fontHeading,
        fontBody,
        setCurrentBreakpointId,
        setBaseStep,
        setMinimum,
        setMaximum,
        setFontHeading,
        setFontBody,
      }}
    >
      {children}
    </TypeScaleCalculatorFormContextData.Provider>
  );
}
