import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { Selector } from "~/context/selectors-builder/interfaces";
import { SelectorEntityState } from "~/context/shared/interfaces/entity-state";
import useTypeScaleCalculatorFormSelector from "~/context/type-scale-calculator-form/hooks/useTypeScaleCalculatorFormSelector";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import useMediaQueriesQueryService from "~/domain/media-queries/useMediaQueriesQueryService";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";
import ActionButton from "../../shared/action-button";
import { CloseIcon } from "../../shared/icons";
import VStackBox from "../../shared/vstack-wrapper";
import StepActions from "./step-actions";
import { StepDetailForm } from "./step-detail-form";
import StepDetails from "./step-details";

export default function MediaQueryEdit() {
  const appScrollbarStyle = useCustomScrollbar();
  const { entityState, currentSelectorId, closeEditCurrentSelector } =
    useMediaQueriesBuilderService();
  const { currentBreakpointId } = useTypeScaleCalculatorFormSelector();
  const { getTokenValues } = useMediaQueriesQueryService();

  const { htmlSelectors } = useHtmlSelectorsSelector();
  const [selectors, setSelectors] = useState<Selector[] | null>(null);

  useEffect(() => {
    setSelectors(htmlSelectors);
  }, [htmlSelectors]);

  return (
    <VStackBox
      w="100%"
      gap="1rem"
      paddingRight=".5rem"
      maxH="600px"
      overflow="auto"
      css={appScrollbarStyle}
    >
      {selectors &&
        selectors.map((s, index) => {
          const { minFontSize, maxFontSize, lineHeight } = getTokenValues(
            currentBreakpointId,
            s.key
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
                    {s.value}
                  </Text>
                  <StepActions selectorId={s.key} />
                </VStackBox>
                {s.key !== currentSelectorId && (
                  <StepDetails
                    minFontSize={minFontSize}
                    maxFontSize={maxFontSize}
                    lineHeight={lineHeight}
                  />
                )}
                {s.key === currentSelectorId && (
                  <HStack justify={"flex-end"} align={"flex-end"}>
                    <ActionButton
                      label="Close Edit Selector"
                      onClick={() => closeEditCurrentSelector(s.key)}
                    >
                      <CloseIcon />
                    </ActionButton>
                  </HStack>
                )}
              </Grid>
              {entityState === SelectorEntityState.edit &&
                s.key === currentSelectorId && (
                  <StepDetailForm selectorId={s.key} />
                )}
            </Box>
          );
        })}
    </VStackBox>
  );
}
