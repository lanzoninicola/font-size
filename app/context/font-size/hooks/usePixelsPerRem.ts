import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function usePixelsPerRem() {
  const pixelsPerRem = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.pixelsPerRem
  );
  const setPixelsPerRem = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setPixelsPerRem
  );

  return {
    pixelsPerRem,
    setPixelsPerRem,
  };
}
