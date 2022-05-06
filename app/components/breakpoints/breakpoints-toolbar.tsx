import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import { DataProvider } from "~/context/app/interfaces";
import useBreakpointsData from "~/domain/breakpoints/useBreakpointsData";
import useBreakpointsRoutes from "~/domain/breakpoints/useBreakpointsRoutes";
import useBreakpointRoutesLocation from "~/domain/breakpoints/useBreakpointsRoutesLocation";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { InitIcon, NewEntityIcon } from "../shared/icons";

export default function BreakpointsToolbar() {
  const { ROUTE_BREAKPOINTS_NEW } = useBreakpointsRoutes();
  const { initBreakpoints } = useBreakpointsData();

  const { currentRoute } = useBreakpointRoutesLocation();

  function onInitBreakpoints() {
    initBreakpoints(DataProvider.default);
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <Link to={ROUTE_BREAKPOINTS_NEW}>
          <ActionButton label="New breakpoint">
            <NewEntityIcon />
          </ActionButton>
        </Link>
        {/* <ActionButton
          label="Load Pre-made Breakpoints"
          onClick={onInitBreakpoints}
        >
          <InitIcon />
        </ActionButton> */}
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
