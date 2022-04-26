import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useBreakpointsRoutes from "~/domain/breakpoints/useBreakpointsRoutes";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { NewEntityIcon } from "../shared/icons";

export default function BreakpointsToolbar() {
  const { ROUTE_BREAKPOINTS_NEW } = useBreakpointsRoutes();

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <ActionButton label="New breakpoint">
          <Link to={ROUTE_BREAKPOINTS_NEW}>
            <NewEntityIcon />
          </Link>
        </ActionButton>
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
