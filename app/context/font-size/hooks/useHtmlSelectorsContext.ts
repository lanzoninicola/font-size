import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";

import { FontSizeContextData } from "../font-size-context";

export default function useHtmlSelectorsContext() {
  const htmlSelectors = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.htmlSelectors
  );

  const setHtmlSelectors = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setHtmlSelectors
  );

  return {
    htmlSelectors,
    setHtmlSelectors,
  };
}
