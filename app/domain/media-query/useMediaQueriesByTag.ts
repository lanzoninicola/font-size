import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { HTMLTags } from "~/context/font-size/interfaces";

export default function useMediaQueriesByTag({ tag }: { tag: HTMLTags }) {
  const { mediaQueries } = useMediaQueriesSelector();

  return {
    mediaQueries: mediaQueries?.[tag],
  };
}
