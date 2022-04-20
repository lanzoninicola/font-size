import { useContextSelector } from "use-context-selector";
import { BreakpointsFormContextData } from "../breakpoints-form-context";

export default function useBreakpointsFormContext() {
  const currentBreakpointId = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.currentBreakpointId
  );

  const setCurrentBreakpointId = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.setCurrentBreakpointId
  );

  const minWidth = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.minWidth
  );

  const setMinWidth = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.setMinWidth
  );

  const maxWidth = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.maxWidth
  );

  const setMaxWidth = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.setMaxWidth
  );

  const label = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.label
  );

  const setLabel = useContextSelector(
    BreakpointsFormContextData,
    (ctx) => ctx?.setLabel
  );

  return {
    currentBreakpointId,
    setCurrentBreakpointId,
    minWidth,
    setMinWidth,
    maxWidth,
    setMaxWidth,
    label,
    setLabel,
  };
}
