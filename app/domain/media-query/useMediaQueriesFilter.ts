import { useEffect, useState } from "react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import { MediaQueries } from "~/context/font-size/interfaces";

export default function useMediaQueryFilter() {
  const { mediaQueries } = useMediaQueriesSelector();

  const [mediaQueriesFiltered, setMediaQueriesFiltered] =
    useState<MediaQueries | null>(mediaQueries);

  function filterByBreakpointId(breakpointId: BreakpointId) {
    if (mediaQueriesFiltered) {
      const nextMediaQueriesFiltered = { ...mediaQueriesFiltered };

      const nextMediaQueries: MediaQueries = {
        [breakpointId]: {
          ...nextMediaQueriesFiltered[breakpointId],
        },
      };

      setMediaQueriesFiltered(nextMediaQueries);
    }
  }

  function filterByBreakpointAndSelector(
    breakpointId: BreakpointId,
    selector: string
  ) {
    if (mediaQueriesFiltered) {
      const nextMediaQueriesFiltered = { ...mediaQueriesFiltered };

      const mediaQueriesSelector =
        nextMediaQueriesFiltered[breakpointId][selector];

      if (mediaQueriesSelector) {
        const nextMediaQueries: MediaQueries = {
          ...nextMediaQueriesFiltered,
          [breakpointId]: {
            ...nextMediaQueriesFiltered[breakpointId],
            [selector]: {
              ...mediaQueriesSelector,
            },
          },
        };

        setMediaQueriesFiltered(nextMediaQueries);
      }
    }
  }

  useEffect(() => {
    if (mediaQueries) {
      setMediaQueriesFiltered(mediaQueries);
    }

    console.log(mediaQueriesFiltered);
  }, [mediaQueries]);

  return {
    mediaQueriesFiltered,
    filterByBreakpointId,
    filterByBreakpointAndSelector,
  };
}