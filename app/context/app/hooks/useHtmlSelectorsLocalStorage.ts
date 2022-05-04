import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_SELECTORS } from "~/context/app/constants";
import { HTMLTags, Selectors, SelectorType } from "../interfaces";

export default function useHtmlSelecotrsLocalStorage() {
  const [htmlSelectors, setHtmlSelectors] = useLocalStorage<Selectors | null>(
    FS_CONTEXT_SELECTORS
  );

  return {
    htmlSelectors,
    setHtmlSelectors,
  };
}
