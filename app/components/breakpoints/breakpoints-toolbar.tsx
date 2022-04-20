import { HStack } from "@chakra-ui/react";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { NewEntityIcon } from "../shared/icons";

export default function BreakpointsToolbar() {
  const { onInitBreakpointsCreation } = useBreakpointsFormService();

  function onCreateBreakpoints() {
    onInitBreakpointsCreation();
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <ActionButton label="New breakpoint" onClick={onCreateBreakpoints}>
          <NewEntityIcon />
        </ActionButton>
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
