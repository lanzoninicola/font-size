import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import {
  BreakpointKey,
  Breakpoints,
  MediaQuerySettingsKey,
} from "~/context/interfaces";

import { FontSizeContextData } from "../font-size-context";
import useMediaQueries from "./useMediaQueries";
import useTag from "./useTag";

export default function useBreakpoint() {
  const { tag } = useTag();
  const { mediaQueries } = useMediaQueries();

  const [minWidth, setMinWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [breakpoints, setBreakpoints] = useState<Breakpoints | null>(null);

  function onChangeBreakpoint(event: React.ChangeEvent<HTMLInputElement>) {
    const breakpointKey = event.target.value;

    if (breakpointKey === "") {
      setMinWidth(0);
      setMaxWidth(0);
    }

    const breakpoint = mediaQueries[tag][breakpointKey];

    if (breakpoint) {
      setMinWidth(breakpoint.minWidth);
      setMaxWidth(breakpoint.maxWidth);
    }
  }

  function getBreakpoints(): Breakpoints {
    return mediaQueries[tag];
  }

  useEffect(() => {
    setBreakpoints(getBreakpoints());
  }, [mediaQueries, minWidth, maxWidth]);

  return {
    minWidth,
    maxWidth,
    breakpoints,
    onChangeBreakpoint,
  };
}
