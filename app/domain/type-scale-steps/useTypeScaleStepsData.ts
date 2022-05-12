import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { DataProvider } from "~/context/app/interfaces";
import {
  HTMLTags,
  TypeScaleStepConfig,
  SelectorType,
} from "~/context/type-scale-steps-builder/interfaces";

export default function useTypeScaleStepsData() {
  const { setTypeScaleSteps } = useHtmlSelectorsSelector();
  const [provider, _] = useLocalStorage(
    "FS_INIT_BREAKPOINTS_PROVIDER",
    DataProvider.default
  );

  function initTypeScaleSteps() {
    const s = getByProvider(provider as DataProvider);
    setTypeScaleSteps(s);
  }

  function getByProvider(provider: DataProvider) {
    if (provider === DataProvider.default) {
      return _getDefault();
    }

    return _getDefault();
  }

  function _getDefault(): TypeScaleStepConfig[] {
    return [
      {
        key: HTMLTags.h1,
        type: SelectorType.tag,
        value: "Heading 1",
        isBaseline: false,
        position: 6,
        isHeading: true,
      },
      {
        key: HTMLTags.h2,
        type: SelectorType.tag,
        value: "Heading 2",
        isBaseline: false,
        position: 5,
        isHeading: true,
      },
      {
        key: HTMLTags.h3,
        type: SelectorType.tag,
        value: "Heading 3",
        isBaseline: false,
        position: 4,
        isHeading: true,
      },
      {
        key: HTMLTags.h4,
        type: SelectorType.tag,
        value: "Heading 4",
        isBaseline: false,
        position: 3,
        isHeading: true,
      },
      {
        key: HTMLTags.h5,
        type: SelectorType.tag,
        value: "Heading 5",
        isBaseline: false,
        position: 2,
        isHeading: true,
      },
      {
        key: HTMLTags.h6,
        type: SelectorType.tag,
        value: "Heading 6",
        isBaseline: false,
        position: 1,
        isHeading: true,
      },
      {
        key: HTMLTags.p,
        type: SelectorType.tag,
        value: "Paragraph",
        isBaseline: true,
        position: 0,
        isHeading: false,
      },
      {
        key: HTMLTags.caption,
        type: SelectorType.tag,
        value: "Caption",
        isBaseline: false,
        position: -1,
        isHeading: false,
      },
    ];
  }

  return {
    getByProvider,
    initTypeScaleSteps,
  };
}
