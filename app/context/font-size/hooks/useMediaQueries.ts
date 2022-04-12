import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useMediaQueries() {
  const mediaQueries = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.mediaQueries
  );

  const setMediaQueries = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setMediaQueries
  );

  return {
    mediaQueries,
    setMediaQueries,
  };
}
