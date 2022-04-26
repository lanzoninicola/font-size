import { useEffect } from "react";
import { Selectors } from "../interfaces";
import useHtmlSelectorsContext from "./useHtmlSelectorsContext";
import useHtmlSelecotrsLocalStorage from "./useHtmlSelectorsLocalStorage";

export default function useHtmlSelectorsSelector() {
  const {
    htmlSelectors: htmlSelectorsContext,
    setHtmlSelectors: setHtmlSelectorsContext,
  } = useHtmlSelectorsContext();

  const {
    htmlSelectors: htmlSelectorsLocalStorage,
    setHtmlSelectors: setHtmlSelectorsLocalStorage,
  } = useHtmlSelecotrsLocalStorage();

  function setHtmlSelectors(nextState: Selectors | null) {
    setHtmlSelectorsLocalStorage(nextState);
  }

  useEffect(() => {
    if (htmlSelectorsLocalStorage) {
      setHtmlSelectorsContext(htmlSelectorsLocalStorage);
    }
  }, [htmlSelectorsLocalStorage]);

  return {
    htmlSelectors: htmlSelectorsContext,
    setHtmlSelectors,
  };
}
