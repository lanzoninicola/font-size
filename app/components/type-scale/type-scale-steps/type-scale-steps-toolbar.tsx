import { HStack } from "@chakra-ui/react";
import { Link } from "remix";
import useBreakpointRoutesLocation from "~/domain/breakpoints/useBreakpointsRoutesLocation";
import useTypeScaleStepsData from "~/domain/type-scale-steps/useTypeScaleStepsData";
import useSelectorsRoutes from "~/domain/type-scale-steps/useTypeScaleStepsRoutes";

import ToolbarWrapper from "../../layout/toolbar-wrapper";
import ActionButton from "../../shared/action-button";
import { EditIcon, InitIcon } from "../../shared/icons";

export default function TypeScaleStepsToolbar() {
  const { ROUTE_SELECTORS_UPDATE } = useSelectorsRoutes();
  const { initTypeScaleSteps } = useTypeScaleStepsData();

  const { currentRoute } = useBreakpointRoutesLocation();

  function onInitSelectors() {
    initTypeScaleSteps();
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
