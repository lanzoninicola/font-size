import useLocalStorage from "~/components/shared/hooks/useLocalStorage";
import { FS_CONTEXT_MEDIA_QUERIES } from "~/context/app/constants";
import { MediaQueries } from "~/context/app/interfaces";

export default function useMediaQueriesLocalStorage() {
  const [mediaQueries, setMediaQueries] = useLocalStorage<MediaQueries | null>(
    FS_CONTEXT_MEDIA_QUERIES,
    DEFAULT_MEDIA_QUERIES
  );

  return {
    mediaQueries,
    setMediaQueries,
  };
}

const DEFAULT_MEDIA_QUERIES: MediaQueries = {
  min300max768: {
    h1: { minFontSize: 1.383, maxFontSize: 1.802, lineHeight: 120 },
    h2: { minFontSize: 1.296, maxFontSize: 1.602, lineHeight: 120 },
    h3: { minFontSize: 1.215, maxFontSize: 1.424, lineHeight: 120 },
    h4: { minFontSize: 1.138, maxFontSize: 1.266, lineHeight: 120 },
    h5: { minFontSize: 1.067, maxFontSize: 1.125, lineHeight: 120 },
    h6: { minFontSize: 1, maxFontSize: 1, lineHeight: 120 },
    p: { minFontSize: 1, maxFontSize: 1, lineHeight: 130 },
    caption: { minFontSize: 0.937, maxFontSize: 0.889, lineHeight: 120 },
  },
  min769max1280: {
    h1: { minFontSize: 2.488, maxFontSize: 3.052, lineHeight: 120 },
    h2: { minFontSize: 2.074, maxFontSize: 2.441, lineHeight: 120 },
    h3: { minFontSize: 1.728, maxFontSize: 1.953, lineHeight: 120 },
    h4: { minFontSize: 1.44, maxFontSize: 1.563, lineHeight: 120 },
    h5: { minFontSize: 1.2, maxFontSize: 1.25, lineHeight: 120 },
    h6: { minFontSize: 1, maxFontSize: 1, lineHeight: 120 },
    p: { minFontSize: 1, maxFontSize: 1, lineHeight: 130 },
    caption: { minFontSize: 0.833, maxFontSize: 0.8, lineHeight: 120 },
  },
  min1281max3840: {
    h1: { minFontSize: 4.209, maxFontSize: 5.653, lineHeight: 120 },
    h2: { minFontSize: 3.157, maxFontSize: 3.998, lineHeight: 120 },
    h3: { minFontSize: 2.369, maxFontSize: 2.827, lineHeight: 120 },
    h4: { minFontSize: 1.777, maxFontSize: 1.999, lineHeight: 120 },
    h5: { minFontSize: 1.333, maxFontSize: 1.414, lineHeight: 120 },
    h6: { minFontSize: 1, maxFontSize: 1, lineHeight: 120 },
    p: { minFontSize: 1, maxFontSize: 1, lineHeight: 130 },
    caption: { minFontSize: 0.75, maxFontSize: 0.707, lineHeight: 120 },
  },
};
