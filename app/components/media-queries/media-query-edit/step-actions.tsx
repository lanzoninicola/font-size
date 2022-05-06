import { HStack } from "@chakra-ui/react";
import ActionButton from "~/components/shared/action-button";
import { EditIcon, ResetIcon, SaveIcon } from "~/components/shared/icons";
import { SelectorId } from "~/context/selectors-builder/interfaces";
import { SelectorEntityState } from "~/context/shared/interfaces/entity-state";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import useMediaQueriesService from "~/domain/media-queries/useMediaQueriesService";

export default function StepActions({
  selectorId,
}: {
  selectorId: SelectorId;
}) {
  const {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    minFontSize,
    maxFontSize,
    editCurrentSelector,
  } = useMediaQueriesBuilderService();

  const { saveMediaQuery, deleteMediaQuery } = useMediaQueriesService();

  return (
    <HStack spacing={1}>
      <ActionButton
        label="Edit Selector"
        onClick={() => editCurrentSelector(selectorId)}
      >
        <EditIcon />
      </ActionButton>
      <ActionButton
        label="Reset Selector"
        onClick={() => deleteMediaQuery(selectorId)}
      >
        <ResetIcon />
      </ActionButton>
      {entityState === SelectorEntityState.edit &&
        currentSelectorId === selectorId && (
          <ActionButton
            label="Save Selector"
            onClick={saveMediaQuery}
            isDisabled={
              currentBreakpointId === "" ||
              currentSelectorId === "" ||
              currentBreakpointId === "no-selected" ||
              currentSelectorId === "no-selected" ||
              minFontSize === "" ||
              maxFontSize === ""
            }
          >
            <SaveIcon />
          </ActionButton>
        )}
    </HStack>
  );
}
