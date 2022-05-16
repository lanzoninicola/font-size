import { HStack } from "@chakra-ui/react";
import ActionButton from "~/components/shared/action-button";
import { EditIcon, ResetIcon, SaveIcon } from "~/components/shared/icons";
import {
  TypeScaleStepConfig,
  TypeScaleStepEntityState,
} from "~/context/app/types";

import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import useMediaQueriesService from "~/domain/media-queries/useMediaQueriesService";

export default function StepActionsButtons({
  step,
}: {
  step: TypeScaleStepConfig;
}) {
  const {
    entityState,
    currentBreakpointId,
    currentTypeScaleStepId,
    minFontSize,
    maxFontSize,
    editCurrentSelector,
  } = useMediaQueriesBuilderService();

  const { saveMediaQuery, deleteMediaQuery } = useMediaQueriesService();

  return (
    <HStack spacing={1}>
      <ActionButton
        label="Edit Selector"
        onClick={() => editCurrentSelector(step)}
      >
        <EditIcon />
      </ActionButton>
      <ActionButton
        label="Reset Selector"
        onClick={() => deleteMediaQuery(step)}
      >
        <ResetIcon />
      </ActionButton>
      {entityState === TypeScaleStepEntityState.edit &&
        currentTypeScaleStepId === step.key && (
          <ActionButton
            label="Save Selector"
            onClick={saveMediaQuery}
            isDisabled={
              currentBreakpointId === "" ||
              currentTypeScaleStepId === "" ||
              currentBreakpointId === "no-selected" ||
              currentTypeScaleStepId === "no-selected" ||
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
