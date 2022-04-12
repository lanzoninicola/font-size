import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";

import { FontSizeContextData } from "../font-size-context";
import useMediaQueries from "./useMediaQueries";
import useTag from "./useTag";

export default function useBreakpointBuilder() {
  const { tag } = useTag();
  const { mediaQueries, setMediaQueries } = useMediaQueries();

  const [minWidth, setMinWidth] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const [breakpointKey, setBreakpointKey] = useState("");
  const [breakpointLabel, setBreakpointLabel] = useState<string>("");

  function onChangeMinWidth(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value, 10);
    setMinWidth(value);
  }

  function onChangeMaxWidth(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value, 10);
    setMaxWidth(value);
  }

  function onCreateBreakpoint(): void {
    // TODO: make this work with the type annotation of prevState
    // @ts-ignore

    setMediaQueries((prevState) => {
      let newBreakpoints = {
        ...prevState,
        [tag]: {
          ...prevState[tag],
        },
      };

      newBreakpoints[tag][breakpointKey] = {
        minWidth,
        maxWidth,
        label: breakpointLabel,
      };

      return newBreakpoints;
    });
  }

  useEffect(() => {
    setBreakpointKey(`min${minWidth}max${maxWidth}`);
    setBreakpointLabel(`min-width: ${minWidth}px and max-width: ${maxWidth}px`);

    console.log("useBreakpointBuilder", mediaQueries);
  }, [tag, minWidth, maxWidth]);

  return {
    minWidth,
    maxWidth,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
  };
}
