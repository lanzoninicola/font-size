import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_MEDIA_QUERIES } from "~/context/app/constants";
import { MediaQueries } from "~/context/app/interfaces";

export default function useMediaQueriesLocalStorage() {
  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQueries | null>(
    FS_CONTEXT_MEDIA_QUERIES
  );

  return {
    mediaQueries,
    setMediaQueries,
  };
}
