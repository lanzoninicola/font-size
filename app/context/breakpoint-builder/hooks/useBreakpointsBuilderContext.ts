import { useContextSelector } from "use-context-selector";
import { BreakpointsBuilderContextData } from "../breakpoints-builder-context";

export default function useBreakpointsBuilderContext() {
  const entityState = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.entityState
  );

  const setEntityState = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.setEntityState
  );

  const currentBreakpointId = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.currentBreakpointId
  );

  const setCurrentBreakpointId = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.setCurrentBreakpointId
  );

  const minWidth = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.minWidth
  );

  const setMinWidth = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.setMinWidth
  );

  const maxWidth = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.maxWidth
  );

  const setMaxWidth = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.setMaxWidth
  );

  const label = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.label
  );

  const setLabel = useContextSelector(
    BreakpointsBuilderContextData,
    (ctx) => ctx?.setLabel
  );

  return {
    entityState,
    setEntityState,
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
