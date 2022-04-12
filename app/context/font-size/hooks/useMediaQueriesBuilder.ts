import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useMediaQueriesBuilder() {
  const onMinFontSizeChange = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMinFontSizeChange
  );

  const onMaxFontSizeChange = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMaxFontSizeChange
  );

  return {
    onMinFontSizeChange,
    onMaxFontSizeChange,
  };
}
