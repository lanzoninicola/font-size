import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useTag() {
  const tag = useContextSelector(FontSizeContextData, (ctx) => ctx?.tag);
  const setTag = useContextSelector(FontSizeContextData, (ctx) => ctx?.setTag);

  return {
    tag,
    setTag,
  };
}
