import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useMaxFontSize() {
  const maxFontSize = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.maxFontSize
  );
  const setMaxFontSize = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMaxFontSizeChange
  );

  return {
    maxFontSize,
    setMaxFontSize,
  };
}
