import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useMinFontSize() {
  const minFontSize = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.minFontSize
  );
  const setMinFontSize = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMinFontSizeChange
  );

  return {
    minFontSize,
    setMinFontSize,
  };
}
