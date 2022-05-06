import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import FormControlSelectBreakpoint from "~/components/shared/form-control-select-breakpoint";
import VStackBox from "~/components/shared/vstack-wrapper";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";

export default function MediaQueriesIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const { actions } = useMediaQueriesRoutes();
  const { currentBreakpointId, setCurrentBreakpointId } =
    useMediaQueryBuilderContext();

  function onChangeCurrentBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    setCurrentBreakpointId(bp);
  }

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      actions.NAVIGATE_TO_MISSING_BREAKPOINTS.dispatch();
    } else {
      actions.NAVIGATE_TO_EDIT_MEDIA_QUERY.dispatch();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <VStackBox gap="2rem">
      <VStackBox spacing={2}>
        <Heading
          as="h4"
          fontSize={"xs"}
          color="secondary.300"
          textTransform={"uppercase"}
          letterSpacing={1}
        >
          1. Select a breakpoint to edit
        </Heading>
        <FormControlSelectBreakpoint
          onChange={onChangeCurrentBreakpoint}
          value={currentBreakpointId}
        />
      </VStackBox>

      {currentBreakpointId !== "" && (
        <>
          <MediaQueryEdit />
        </>
      )}
    </VStackBox>
  );
}
