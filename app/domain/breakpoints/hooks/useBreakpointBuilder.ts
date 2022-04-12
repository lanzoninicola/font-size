import { useEffect, useState } from "react";
import useBreakpoints from "~/context/font-size/hooks/useBreakpoints";
import { BreakpointKey } from "~/context/interfaces";

export default function useBreakpointBuilder({
  inputMinWidth,
  inputMaxWidth,
}: {
  inputMinWidth: number;
  inputMaxWidth: number;
}) {
  const { breakpoints, setBreakpoints } = useBreakpoints();

  const [breakpointKey, setBreakpointKey] = useState("");
  const [breakpointLabel, setBreakpointLabel] = useState<string>("...");
  const [breakpointKeySelected, setBreakpointKeySelected] =
    useState<BreakpointKey>("");

  function onUpdateBreakpoint() {
    let newBreakpoints = { ...breakpoints };

    delete newBreakpoints[breakpointKeySelected];

    newBreakpoints[breakpointKey] = {
      label: breakpointLabel,
      minWidth: inputMinWidth,
      maxWidth: inputMaxWidth,
    };

    setBreakpoints(newBreakpoints);
  }

  function onCreateBreakpoint(): void {
    let newBreakpoints = { ...breakpoints };

    newBreakpoints[breakpointKey] = {
      label: breakpointLabel,
      minWidth: inputMinWidth,
      maxWidth: inputMaxWidth,
    };

    setBreakpoints(newBreakpoints);
  }

  function onSelectedBreakpoint(event: React.ChangeEvent<HTMLInputElement>) {
    let breakpoint = null;
    let minWidth = 0;
    let maxWidth = 0;

    const breakpointKey = event.target.value;

    if (breakpoints) {
      breakpoint = breakpoints[breakpointKey];
    }

    if (breakpoint) {
      setBreakpointKeySelected(breakpointKey);

      minWidth = breakpoint.minWidth || 0;
      maxWidth = breakpoint.maxWidth || 0;
    }

    return {
      minWidth,
      maxWidth,
    };
  }

  useEffect(() => {
    if (inputMinWidth > 0 && inputMaxWidth > 0) {
      setBreakpointKey(`min${inputMinWidth}max${inputMaxWidth}`);

      setBreakpointLabel(
        `min-width: ${inputMinWidth}px and max-width: ${inputMaxWidth}px`
      );
    }

    console.log("useBreakpointBuilder", breakpoints);
  }, [inputMinWidth, inputMaxWidth, breakpoints]);

  return {
    breakpoints,
    breakpointKey,
    breakpointLabel,
    breakpointKeySelected,
    onCreateBreakpoint,
    onUpdateBreakpoint,
    onSelectedBreakpoint,
  };
}
