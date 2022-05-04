import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import {
  HTMLTags,
  Selectors,
  SelectorType,
} from "~/context/selectors-builder/interfaces";

export enum DataProvider {
  default = "default",
  chakraui = "chackraui",
  tailwindcss = "tailwindcss",
  bootstrap = "bootstrap",
}

export default function useSelectorsData() {
  const { setHtmlSelectors } = useHtmlSelectorsSelector();
  const [provider, _] = useLocalStorage("FS_INIT_BREAKPOINTS_PROVIDER");

  function initSelectors() {
    const s = getSelectorsByProvider(provider as DataProvider);
    setHtmlSelectors(s);
  }

  function getSelectorsByProvider(provider: DataProvider) {
    if (provider === DataProvider.default) {
      return _getDefaultSelectors();
    }

    return _getDefaultSelectors();
  }

  function _getDefaultSelectors(): Selectors {
    return [
      {
        key: HTMLTags.h1,
        type: SelectorType.tag,
        value: "Heading 1",
        isBaseline: false,
        order: 6,
      },
      {
        key: HTMLTags.h2,
        type: SelectorType.tag,
        value: "Heading 2",
        isBaseline: false,
        order: 5,
      },
      {
        key: HTMLTags.h3,
        type: SelectorType.tag,
        value: "Heading 3",
        isBaseline: false,
        order: 4,
      },
      {
        key: HTMLTags.h4,
        type: SelectorType.tag,
        value: "Heading 4",
        isBaseline: false,
        order: 3,
      },
      {
        key: HTMLTags.h5,
        type: SelectorType.tag,
        value: "Heading 5",
        isBaseline: false,
        order: 2,
      },
      {
        key: HTMLTags.h6,
        type: SelectorType.tag,
        value: "Heading 6",
        isBaseline: false,
        order: 1,
      },
      {
        key: HTMLTags.p,
        type: SelectorType.tag,
        value: "Paragraph",
        isBaseline: true,
        order: 0,
      },
      {
        key: HTMLTags.caption,
        type: SelectorType.tag,
        value: "Caption",
        isBaseline: false,
        order: -1,
      },
    ];
  }

  return {
    initSelectors,
  };
}
