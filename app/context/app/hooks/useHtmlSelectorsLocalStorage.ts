import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_SELECTORS } from "~/context/app/constants";
import { HTMLTags, Selectors, SelectorType } from "../interfaces";

export default function useHtmlSelecotrsLocalStorage() {
  const [htmlSelectors, setHtmlSelectors] = useLocalStorage<Selectors | null>(
    FS_CONTEXT_SELECTORS,
    INIT_SELECTORS
  );

  return {
    htmlSelectors,
    setHtmlSelectors,
  };
}

const INIT_SELECTORS: Selectors = [
  {
    key: HTMLTags.h1,
    type: SelectorType.tag,
    value: "Heading 1",
  },
  {
    key: HTMLTags.h2,
    type: SelectorType.tag,
    value: "Heading 2",
  },
  {
    key: HTMLTags.h3,
    type: SelectorType.tag,
    value: "Heading 3",
  },
  {
    key: HTMLTags.h4,
    type: SelectorType.tag,
    value: "Heading 4",
  },
  {
    key: HTMLTags.h5,
    type: SelectorType.tag,
    value: "Heading 5",
  },
  {
    key: HTMLTags.h6,
    type: SelectorType.tag,
    value: "Heading 6",
  },
  {
    key: HTMLTags.p,
    type: SelectorType.tag,
    value: "Paragraph",
  },
  {
    key: HTMLTags.caption,
    type: SelectorType.tag,
    value: "Caption",
  },
];
