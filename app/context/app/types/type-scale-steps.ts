export enum HTMLTags {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  p = "p",
  caption = "caption",
}
export type CSSClassAttribute = string;

export type StepId = HTMLTags | CSSClassAttribute;
export enum StepType {
  tag = "tag",
  class = "class",
}

export type TypeScaleStepConfig = {
  key: string;
  type: StepType;
  value: HTMLTags | CSSClassAttribute;
  isBaseline: boolean;
  position: number;
  isHeading: boolean;
};

export enum TypeScaleStepEntityState {
  idle = "idle",
  edit = "edit",
}

export enum TypeScaleStepProvider {
  default = "default",
}
