import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_MEDIA_QUERIES } from "~/context/constants";
import { MediaQueries } from "~/context/font-size/interfaces";

export default function useMediaQueriesLocalStorage() {
  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQueries | null>(
    FS_CONTEXT_MEDIA_QUERIES,
    null
  );

  return {
    mediaQueries,
    setMediaQueries,
  };
}
