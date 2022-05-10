import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypeScaleStepsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { TypeScaleStepEntityState } from "~/context/app/interfaces";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import useMediaQueriesQueryService from "~/domain/media-queries/useMediaQueriesQueryService";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";

import ActionButton from "../../shared/action-button";
import { CloseIcon } from "../../shared/icons";
import VStackBox from "../../shared/vstack-wrapper";
import StepActionsButtons from "./step-actions-buttons";
import { StepDetailForm } from "./step-detail-form";
import StepDetails from "./step-details";

export default function MediaQueryBuilder() {
  const appScrollbarStyle = useCustomScrollbar();
  const { mediaQueries } = useMediaQueriesSelector();
  const {
    entityState,
    currentBreakpointId,
    currentTypeScaleStepId,
    closeEditCurrentSelector,
  } = useMediaQueriesBuilderService();
  const { getMediaQueryByBreakpointIdAndStepId } =
    useMediaQueriesQueryService(mediaQueries);

  const { typeScaleSteps } = useTypeScaleStepsSelector();

  return (
    <VStackBox
      w="100%"
      gap="1rem"
      paddingRight=".5rem"
      maxH="600px"
      overflow="auto"
      css={appScrollbarStyle}
    >
      {typeScaleSteps &&
        typeScaleSteps.map((step, index) => {
          const stepMediaQuery = getMediaQueryByBreakpointIdAndStepId(
            currentBreakpointId,
            step.key
          );

          return (
            <Box
              key={index}
              w="100%"
              borderBottom={"1px solid"}
              borderBottomColor={"primaryAlpha.20"}
              paddingBlock=".5rem"
            >
              <Grid w="100%" gridTemplateColumns={".25fr 1fr"} columnGap="1rem">
                <VStackBox minH="65px">
                  <Text
                    color="primary.500"
                    fontSize={"sm"}
                    fontWeight={700}
                    flexGrow={2}
                  >
                    {step.value}
                  </Text>
                  <StepActionsButtons step={step} />
                </VStackBox>
                {step.key !== currentTypeScaleStepId && (
                  <StepDetails
                    minFontSize={stepMediaQuery.minFontSize}
                    maxFontSize={stepMediaQuery.maxFontSize}
                    lineHeight={stepMediaQuery.lineHeight}
                    marginBottom={stepMediaQuery.marginBottom}
                    fontFamily={stepMediaQuery.fontFamily}
                  />
                )}
                {step.key === currentTypeScaleStepId && (
                  <HStack justify={"flex-end"} align={"flex-end"}>
                    <ActionButton
                      label="Close Edit Selector"
                      onClick={() => closeEditCurrentSelector()}
                    >
                      <CloseIcon />
                    </ActionButton>
                  </HStack>
                )}
              </Grid>
              {entityState === TypeScaleStepEntityState.edit &&
                step.key === currentTypeScaleStepId && (
                  <StepDetailForm stepId={step.key} />
                )}
            </Box>
          );
        })}
    </VStackBox>
  );
}
