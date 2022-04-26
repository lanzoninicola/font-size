import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { AppContextData } from "../app-context";

export default function useMediaQueriesContext() {
  const mediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.mediaQueries
  );

  const setMediaQueries = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setMediaQueries
  );

  return {
    mediaQueries,
    setMediaQueries,
  };
}
