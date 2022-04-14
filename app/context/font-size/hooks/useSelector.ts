import { useContextSelector } from "use-context-selector";
import { FontSizeContextData } from "../font-size-context";

export default function useSelector() {
  const selector = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.selector
  );
  const setSelector = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setSelector
  );

  return {
    selector,
    setSelector,
  };
}
