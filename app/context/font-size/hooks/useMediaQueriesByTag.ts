import { useContextSelector } from "use-context-selector";
import { Tags } from "~/context/interfaces";
import { FontSizeContextData } from "../font-size-context";

export default function useMediaQueriesByTag({ tag }: { tag: Tags }) {
  const mediaQueries = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.mediaQueries
  );

  return {
    mediaQueries: mediaQueries?.[tag],
  };
}
