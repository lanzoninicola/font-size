import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useMaxViewportWidth() {
  const maxViewportWidth = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.maxViewportWidth
  );
  const setMaxViewportWidth = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMaxViewportWidthChange
  );

  return {
    maxViewportWidth,
    setMaxViewportWidth,
  };
}
