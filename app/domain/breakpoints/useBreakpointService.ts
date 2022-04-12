import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/font-size/hooks/useBreakpointsSelector";
import usePixelsPerRemSelector from "~/context/font-size/hooks/usePixelsPerRemSelector";
import { BreakpointKey, Tags } from "~/context/interfaces";

export default function useBreakpointService(
  inputMinWidth?: number,
  inputMaxWidth?: number
) {
  const { breakpoints } = useBreakpointsSelector();
  const { pixelsPerRem } = usePixelsPerRemSelector();
  const [breakpointId, setBreakpointId] = useState("");
  const [breakpointLabel, setBreakpointLabel] = useState<string>("...");
  const [breakpointIdSelected, setBreakpointIdSelected] =
    useState<BreakpointKey>("no-selected");

  /**
   * 
   * Not used
   * If the user wants to update, press the SAVE button 
   * and override the breakpoint
   * 
  function onUpdateBreakpoint() {
    let newBreakpoints = { ...breakpoints };

    delete newBreakpoints[breakpointIdSelected];

    newBreakpoints[breakpointId] = {
      label: breakpointLabel,
      minWidth: inputMinWidth,
      maxWidth: inputMaxWidth,
    };

    setBreakpoints(newBreakpoints);
  }
   */

  function onCreateBreakpoint(): void {
    let newBreakpoints = { ...breakpoints };

    newBreakpoints[breakpointId] = {
      label: breakpointLabel,
      minWidth: inputMinWidth,
      maxWidth: inputMaxWidth,
    };

    console.log(newBreakpoints);

    // setBreakpoints(newBreakpoints);
  }

  function setCurrentBreakpointIdSelected(breakpointId: BreakpointKey) {
    setBreakpointIdSelected(breakpointId);
  }

  function getBreakpointValuesById(breakpointId: BreakpointKey) {
    let breakpoint = null;
    let minWidth = 0;
    let maxWidth = 0;
    let minWidthREM = 0;
    let maxWidthREM = 0;

    if (breakpoints) {
      breakpoint = breakpoints[breakpointId];
    }

    if (breakpoint) {
      minWidth = breakpoint.minWidth || 0;
      maxWidth = breakpoint.maxWidth || 0;
      minWidthREM = minWidth / pixelsPerRem;
      maxWidthREM = maxWidth / pixelsPerRem;
    }

    return {
      minWidth,
      maxWidth,
      minWidthREM,
      maxWidthREM,
    };
  }

  function onSelectedBreakpoint(event: React.ChangeEvent<HTMLInputElement>) {
    const breakpointId = event.target.value;
    setCurrentBreakpointIdSelected(breakpointId);

    return getBreakpointValuesById(breakpointId);
  }

  useEffect(() => {
    if (
      inputMinWidth &&
      inputMinWidth > 0 &&
      inputMaxWidth &&
      inputMaxWidth > 0
    ) {
      setBreakpointId(`min${inputMinWidth}max${inputMaxWidth}`);

      setBreakpointLabel(
        `min-width: ${inputMinWidth}px and max-width: ${inputMaxWidth}px`
      );
    }
  }, [inputMinWidth, inputMaxWidth, breakpoints, breakpointIdSelected]);

  return {
    breakpoints,
    breakpointId,
    breakpointLabel,
    breakpointIdSelected,
    setCurrentBreakpointIdSelected,
    getBreakpointValuesById,
    onCreateBreakpoint,
    onSelectedBreakpoint,
  };
}
