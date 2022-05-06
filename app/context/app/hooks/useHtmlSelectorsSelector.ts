import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";

import { AppContextData } from "../app-context";

export default function useHtmlSelectorsSelector() {
  const htmlSelectors = useContextSelector(
    AppContextData,
    (ctx) => ctx?.htmlSelectors
  );

  const setHtmlSelectors = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setHtmlSelectors
  );

  return {
    htmlSelectors,
    setHtmlSelectors,
  };
}
