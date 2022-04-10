import { useContextSelector } from "use-context-selector";
import { Tags } from "~/context/interfaces";
import { FontSizeContextData } from "../font-size-context";

export default function useMinViewportWidth() {
  const minViewportWidth = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.minViewportWidth
  );
  const setMinViewportWidth = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.onMinViewportWidthChange
  );

  return {
    minViewportWidth,
    setMinViewportWidth,
  };
}
