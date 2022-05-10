import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MediaQueryBuilder from "~/components/media-queries/media-query-builder/media-query-builder";
import StepActions from "~/components/media-queries/media-query-builder/step-actions-buttons";
import BreakpointsPicker from "~/components/shared/breakpoints-picker";
import VStackBox from "~/components/shared/vstack-wrapper";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";

export default function MediaQueriesBuilderPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();
  const { actions: mediaQueriesRoutesActions } = useMediaQueriesRoutes();
  const { actions: mediaQueriesActions } = useMediaQueryBuilderContext();
  const { currentBreakpointId, setCurrentBreakpointId } =
    useMediaQueryBuilderContext();

  function onChangeCurrentBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    setCurrentBreakpointId(bp);

    mediaQueriesActions.MEDIA_QUERY_BUILDER__CHANGE_BREAKPOINT.dispatch(bp);
  }

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      mediaQueriesRoutesActions.NAVIGATE_TO_MISSING_BREAKPOINTS.dispatch();
    } else {
      mediaQueriesRoutesActions.NAVIGATE_TO_MEDIA_QUERY_BUILDER.dispatch();
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
          1. Select a breakpoint
        </Heading>
        <BreakpointsPicker
          size="sm"
          onChange={onChangeCurrentBreakpoint}
          value={currentBreakpointId}
        />
      </VStackBox>

      {currentBreakpointId !== "" && (
        <>
          <MediaQueryBuilder />
        </>
      )}
    </VStackBox>
  );
}
