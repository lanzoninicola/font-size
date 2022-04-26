import { useContextSelector } from "use-context-selector";
import { AppContextData } from "../app-context";

export default function usePixelsPerRemSelector() {
  const pixelsPerRem = useContextSelector(
    AppContextData,
    (ctx) => ctx?.pixelsPerRem
  );
  const setPixelsPerRem = useContextSelector(
    AppContextData,
    (ctx) => ctx?.setPixelsPerRem
  );

  return {
    pixelsPerRem,
    setPixelsPerRem,
  };
}
