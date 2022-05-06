import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { DataProvider } from "~/context/app/interfaces";
import {
  HTMLTags,
  Selector,
  SelectorType,
} from "~/context/selectors-builder/interfaces";

export default function useSelectorsData() {
  const { setHtmlSelectors } = useHtmlSelectorsSelector();
  const [provider, _] = useLocalStorage("FS_INIT_BREAKPOINTS_PROVIDER");

  function initSelectors() {
    const s = getByProvider(provider as DataProvider);
    setHtmlSelectors(s);
  }

  function getByProvider(provider: DataProvider) {
    if (provider === DataProvider.default) {
      return _getDefaultSelectors();
    }

    return _getDefaultSelectors();
  }

  function _getDefaultSelectors(): Selector[] {
    return [
      {
        key: HTMLTags.h1,
        type: SelectorType.tag,
        value: "Heading 1",
        isBaseline: false,
        position: 6,
      },
      {
        key: HTMLTags.h2,
        type: SelectorType.tag,
        value: "Heading 2",
        isBaseline: false,
        position: 5,
      },
      {
        key: HTMLTags.h3,
        type: SelectorType.tag,
        value: "Heading 3",
        isBaseline: false,
        position: 4,
      },
      {
        key: HTMLTags.h4,
        type: SelectorType.tag,
        value: "Heading 4",
        isBaseline: false,
        position: 3,
      },
      {
        key: HTMLTags.h5,
        type: SelectorType.tag,
        value: "Heading 5",
        isBaseline: false,
        position: 2,
      },
      {
        key: HTMLTags.h6,
        type: SelectorType.tag,
        value: "Heading 6",
        isBaseline: false,
        position: 1,
      },
      {
        key: HTMLTags.p,
        type: SelectorType.tag,
        value: "Paragraph",
        isBaseline: true,
        position: 0,
      },
      {
        key: HTMLTags.caption,
        type: SelectorType.tag,
        value: "Caption",
        isBaseline: false,
        position: -1,
      },
    ];
  }

  return {
    getByProvider,
    initSelectors,
  };
}
