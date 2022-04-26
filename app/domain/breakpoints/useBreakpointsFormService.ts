import useBreakpointsFormContext from "~/context/breakpoint-builder/hooks/useBreakpointsFormContext";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";

import parseInputString from "../utilities/parseInputString";
import { DeleteBreakpointResponse } from "./interfaces";
import { BreakpointResponse } from "./interfaces/data-service";
import useBreakpointsDataService from "./useBreakpointsDataService";
import useBreakpointsQueryService from "./useBreakpointsQueryService";

/**
 * @description This hook is responsible for managing the state mutation of Breakpoints form.
 *
 */
export default function useBreakpointsFormService() {
  const {
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,
    setCurrentBreakpointId,
    setMinWidth,
    setMaxWidth,
    setLabel,
  } = useBreakpointsFormContext();

  const { getBreakpointById } = useBreakpointsQueryService();

  const { buildLabel, createBreakpoint, updateBreakpoint, deleteBreakpoint } =
    useBreakpointsDataService();

  function onChangeLabel(label: string) {
    setLabel(label);
  }

  function onChangeMinWidth(inputMinWidth: string) {
    const minWidth = parseInputString(inputMinWidth);
    setMinWidth(minWidth);
  }

  function onChangeMaxWidth(inputMaxWidth: string) {
    const maxWidth = parseInputString(inputMaxWidth);
    setMaxWidth(maxWidth);
  }

  function onDeleteBreakpoint(
    breakpointId: BreakpointId
  ): DeleteBreakpointResponse {
    const deleteResponse = deleteBreakpoint(breakpointId);

    return deleteResponse;
  }

  function onCreateBreakpoint() {
    const creationResponse = createBreakpoint(minWidth, maxWidth, label);

    if (creationResponse.ok) {
      if (creationResponse.payload) {
        setCurrentBreakpointId(creationResponse.payload.id);
        setMinWidth("");
        setMaxWidth("");
        setLabel("");
      }
    }

    return creationResponse;
  }

  function onUpdateInit(breakpointId: BreakpointId): BreakpointResponse {
    const response = getBreakpointById(breakpointId);

    if (response.ok) {
      if (response.payload) {
        const { id, minWidth, maxWidth, label } = response.payload;
        setCurrentBreakpointId(id);
        setMinWidth(minWidth);
        setMaxWidth(maxWidth);
        setLabel(label);
      }
    }

    return {
      ok: response.ok,
      payload: response.payload,
      error: response.error,
    };
  }

  function onUpdateBreakpoint() {
    const updateResponse = updateBreakpoint(
      currentBreakpointId,
      minWidth,
      maxWidth,
      label
    );

    if (updateResponse.ok) {
      if (updateResponse.payload) {
        setCurrentBreakpointId(updateResponse.payload.id);
        setMinWidth(minWidth);
        setMaxWidth(maxWidth);
        setLabel(updateResponse.payload.label);
      }
    }

    return updateResponse;
  }

  return {
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,

    onUpdateInit,
    onChangeLabel,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
    onUpdateBreakpoint,
    onDeleteBreakpoint,
    setCurrentBreakpointId,
    buildLabel,
  };
}
