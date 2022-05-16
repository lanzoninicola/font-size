import {
  HTMLTags,
  StepType,
  TypeScaleStepConfig,
  TypeScaleStepProvider,
} from "~/context/app/types/type-scale-steps";

type UseTypeScaleStepsInitialState = {
  get: (provider?: TypeScaleStepProvider) => TypeScaleStepConfig[];
};

export default function useTypeScaleStepsInitialState(): UseTypeScaleStepsInitialState {
  function get(provider?: TypeScaleStepProvider) {
    if (provider === TypeScaleStepProvider.default) {
      return _getDefault();
    }

    return _getDefault();
  }

  function _getDefault(): TypeScaleStepConfig[] {
    return [
      {
        key: HTMLTags.h1,
        type: StepType.tag,
        value: "Heading 1",
        isBaseline: false,
        position: 6,
        isHeading: true,
      },
      {
        key: HTMLTags.h2,
        type: StepType.tag,
        value: "Heading 2",
        isBaseline: false,
        position: 5,
        isHeading: true,
      },
      {
        key: HTMLTags.h3,
        type: StepType.tag,
        value: "Heading 3",
        isBaseline: false,
        position: 4,
        isHeading: true,
      },
      {
        key: HTMLTags.h4,
        type: StepType.tag,
        value: "Heading 4",
        isBaseline: false,
        position: 3,
        isHeading: true,
      },
      {
        key: HTMLTags.h5,
        type: StepType.tag,
        value: "Heading 5",
        isBaseline: false,
        position: 2,
        isHeading: true,
      },
      {
        key: HTMLTags.h6,
        type: StepType.tag,
        value: "Heading 6",
        isBaseline: false,
        position: 1,
        isHeading: true,
      },
      {
        key: HTMLTags.p,
        type: StepType.tag,
        value: "Paragraph",
        isBaseline: true,
        position: 0,
        isHeading: false,
      },
      {
        key: HTMLTags.caption,
        type: StepType.tag,
        value: "Caption",
        isBaseline: false,
        position: -1,
        isHeading: false,
      },
    ];
  }

  return {
    get,
  };
}
