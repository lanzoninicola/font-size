import { useToast } from "@chakra-ui/react";
import useBreakpointsBuilderContext from "~/context/breakpoint-builder/hooks/useBreakpointsFormContext";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { EntityState } from "~/context/shared/interfaces/entity-state";

import parseInputString from "../utilities/parseInputString";
import { DeleteBreakpointResponse } from "./interfaces";
import useBreakpointsDataService from "./useBreakpointsDataService";
import useBreakpointsQueryService from "./useBreakpointsQueryService";

/**
 * @description This hook is responsible for managing the state mutation of Breakpoints form.
 *
 */
export default function useBreakpointsFormService() {
  const {
    entityState,
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,
    setEntityState,
    setCurrentBreakpointId,
    setMinWidth,
    setMaxWidth,
    setLabel,
  } = useBreakpointsBuilderContext();

  const { isBreakpointExists, getViewportSizeByBreakpointId } =
    useBreakpointsQueryService();

  const { createBreakpoint, updateBreakpoint, deleteBreakpoint } =
    useBreakpointsDataService();

  console.log("useBreakpointsFormService fired");

  function onInitBreakpointsCreation() {
    setEntityState(EntityState.new);
    setCurrentBreakpointId("");
    setMinWidth("");
    setMaxWidth("");
    setLabel("");
  }

  function onChangeBreakpoint(breakpointIdSelected: BreakpointId) {
    if (isBreakpointExists(breakpointIdSelected)) {
      setEntityState(EntityState.edit);
      setCurrentBreakpointId(breakpointIdSelected);
      _updateMinMaxWidthOfBreakpointId(breakpointIdSelected);
    } else {
      setEntityState(EntityState.new);
    }
  }

  function onChangeMinWidth(inputMinWidth: string) {
    const minWidth = parseInputString(inputMinWidth);
    setMinWidth(minWidth);
  }

  function onChangeMaxWidth(inputMaxWidth: string) {
    const maxWidth = parseInputString(inputMaxWidth);
    setMaxWidth(maxWidth);
  }

  function _updateMinMaxWidthOfBreakpointId(breakpointId: BreakpointId) {
    const { minWidth, maxWidth } = getViewportSizeByBreakpointId(breakpointId);
    setMinWidth(String(minWidth));
    setMaxWidth(String(maxWidth));
  }

  function onEditBreakpoint(breakpointId: BreakpointId) {
    setEntityState(EntityState.edit);
    setCurrentBreakpointId(breakpointId);
    _updateMinMaxWidthOfBreakpointId(breakpointId);
  }

  function onDeleteBreakpoint(
    breakpointId: BreakpointId
  ): DeleteBreakpointResponse {
    const deleteResponse = deleteBreakpoint(breakpointId);

    if (deleteResponse.ok) {
      setEntityState(EntityState.idle);
      setCurrentBreakpointId("");
      setMinWidth("");
      setMaxWidth("");
      setLabel("");
    }

    return deleteResponse;
  }

  function onCreateBreakpoint() {
    const creationResponse = createBreakpoint(minWidth, maxWidth);

    if (creationResponse.ok) {
      if (creationResponse.payload) {
        setEntityState(EntityState.edit);
        setCurrentBreakpointId(creationResponse.payload.id);
        setMinWidth(minWidth);
        setMaxWidth(maxWidth);
        setLabel(label);
      }
    }

    return creationResponse;
  }

  function onUpdateBreakpoint() {
    const updateResponse = updateBreakpoint(
      currentBreakpointId,
      minWidth,
      maxWidth
    );

    if (updateResponse.ok) {
      if (updateResponse.payload) {
        setEntityState(EntityState.edit);
        setCurrentBreakpointId(updateResponse.payload.id);
        setMinWidth(minWidth);
        setMaxWidth(maxWidth);
        setLabel(updateResponse.payload.label);
      }
    }

    return updateResponse;
  }

  return {
    entityState,
    currentBreakpointId,
    minWidth,
    maxWidth,
    label,
    onChangeBreakpoint,
    onChangeMinWidth,
    onChangeMaxWidth,
    onCreateBreakpoint,
    onUpdateBreakpoint,
    onEditBreakpoint,
    onDeleteBreakpoint,
    onInitBreakpointsCreation,
  };
}
