import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { Tags } from "~/context/interfaces";

export default function useMediaQueriesByTag({ tag }: { tag: Tags }) {
  const { mediaQueries } = useMediaQueriesSelector();

  return {
    mediaQueries: mediaQueries?.[tag],
  };
}
