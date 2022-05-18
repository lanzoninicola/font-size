import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointsProvider } from "~/context/app/types/breakpoints";

import useRouteLocation from "~/domain/app/useRouteLocation";
import useBreakpointsRoutes from "~/domain/breakpoints/useBreakpointsRoutes";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { ExitIcon, InitIcon, NewEntityIcon } from "../shared/icons";

// TODO: This component contains logic that should be moved to a dedicated service.
export default function BreakpointsToolbar() {
  const { ROUTE_BREAKPOINTS_NEW, ROUTE_BREAKPOINTS_BASE_ROUTE } =
    useBreakpointsRoutes();
  const { actions } = useBreakpointsSelector();

  const { isCurrentRoute } = useRouteLocation();

  function onInitBreakpoints() {
    actions.BREAKPOINTS__INIT_WITH_PRE_BUILT_BREAKPOINTS.dispatch(
      BreakpointsProvider.default
    );
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <Link to={ROUTE_BREAKPOINTS_NEW}>
          <ActionButton label="New breakpoint">
            <NewEntityIcon />
          </ActionButton>
        </Link>
        <ActionButton
          label="Load pre-built Breakpoints configuration"
          onClick={onInitBreakpoints}
        >
          <InitIcon />
        </ActionButton>
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}

      {!isCurrentRoute(ROUTE_BREAKPOINTS_BASE_ROUTE) && (
        <Link to={ROUTE_BREAKPOINTS_BASE_ROUTE}>
          <ActionButton label="Exit">
            <ExitIcon />
          </ActionButton>
        </Link>
      )}
    </ToolbarWrapper>
  );
}
