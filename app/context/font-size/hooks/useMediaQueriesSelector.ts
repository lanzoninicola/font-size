import { useEffect } from "react";
import { MediaQueries } from "~/context/font-size/interfaces";

import useMediaQueriesContext from "./useMediaQueriesContext";
import useMediaQueriesLocalStorage from "./useMediaQueriesLocalStorage";

export default function useMediaQueriesSelector() {
  const {
    mediaQueries: mediaQueriesContext,
    setMediaQueries: setMediaQueriesContext,
  } = useMediaQueriesContext();
  const {
    mediaQueries: mediaQueriesLocalStorage,
    setMediaQueries: setMediaQueriesLocalStorage,
  } = useMediaQueriesLocalStorage();

  function setMediaQueries(nextState: MediaQueries | null) {
    if (nextState) {
      setMediaQueriesContext(nextState);
      setMediaQueriesLocalStorage(nextState);
    }
  }

  // Commented this because it cause a re-rendering of the whole app
  // every time a component is render.
  // With this configuration, if local storage is not enabled or accessible then the app will crash
  //
  useEffect(() => {
    if (mediaQueriesLocalStorage) {
      setMediaQueriesContext(mediaQueriesLocalStorage);
    }
  }, [mediaQueriesLocalStorage]);

  return {
    mediaQueries: mediaQueriesContext,
    setMediaQueries,
  };
}
