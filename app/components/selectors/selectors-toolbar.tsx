import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useBreakpointsData, {
  DataProvider,
} from "~/domain/breakpoints/useBreakpointsData";
import useBreakpointsRoutes from "~/domain/breakpoints/useBreakpointsRoutes";
import useBreakpointRoutesLocation from "~/domain/breakpoints/useBreakpointsRoutesLocation";
import useSelectorsData from "~/domain/selectors/useSelectorsData";
import useSelectorsRoutes from "~/domain/selectors/useSelectorsRoutes";

import ToolbarWrapper from "../layout/toolbar-wrapper";
import ActionButton from "../shared/action-button";
import { EditIcon, InitIcon, NewEntityIcon } from "../shared/icons";

export default function SelectorsToolbar() {
  const { ROUTE_SELECTORS_UPDATE } = useSelectorsRoutes();
  const { initSelectors } = useSelectorsData();

  const { currentRoute } = useBreakpointRoutesLocation();

  function onInitSelectors() {
    initSelectors();
  }

  return (
    <ToolbarWrapper justify="space-between">
      <HStack>
        <Link to={ROUTE_SELECTORS_UPDATE}>
          <ActionButton label="Edit Selectors">
            <EditIcon />
          </ActionButton>
        </Link>
        <ActionButton label="Load Pre-made Selectors" onClick={onInitSelectors}>
          <InitIcon />
        </ActionButton>
      </HStack>
      {/* <ActionButton label="Export configuration">
        <ExportConfig />
      </ActionButton> */}
    </ToolbarWrapper>
  );
}
