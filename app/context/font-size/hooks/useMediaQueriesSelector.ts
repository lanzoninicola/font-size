import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_MEDIA_QUERIES } from "~/context/constants";
import { TagMediaQueries } from "~/context/interfaces";
import { FontSizeContextData } from "../font-size-context";

export default function useMediaQueriesSelector() {
  const mediaQueries = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.mediaQueries
  );

  const setMediaQueriesState = useContextSelector(
    FontSizeContextData,
    (ctx) => ctx?.setMediaQueries
  );

  const [mediaQueriesOnLocalStorage, setMediaQueriesOnLocalStorage] =
    useLocalStorage<TagMediaQueries | null>(FS_CONTEXT_MEDIA_QUERIES, null);

  function setMediaQueries(nextState: TagMediaQueries | null) {
    if (nextState) {
      setMediaQueriesState(nextState);
      setMediaQueriesOnLocalStorage(nextState);
    }
  }

  useEffect(() => {
    if (mediaQueriesOnLocalStorage) {
      setMediaQueriesState(mediaQueriesOnLocalStorage);
    }
  }, [mediaQueries]);

  return {
    mediaQueries,
    setMediaQueries,
  };
}
