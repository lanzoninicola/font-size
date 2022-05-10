import { HStack } from "@chakra-ui/react";

import ToolbarWrapper from "../../layout/toolbar-wrapper";

export default function TypeScaleToolbar() {
  return (
    <ToolbarWrapper justify="space-between">
      <HStack></HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
