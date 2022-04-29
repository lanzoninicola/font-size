import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { SelectorId, Selectors } from "~/context/app/interfaces";
import { SelectorEntityState } from "~/context/shared/interfaces/entity-state";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import useMediaQueriesQueryService from "~/domain/media-queries/useMediaQueriesQueryService";
import useMediaQueriesService from "~/domain/media-queries/useMediaQueriesService";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";

import ActionButton from "../shared/action-button";
import FormControlInputNumber from "../shared/form-control-input-number";
import FormControlSelectBreakpoint from "../shared/form-control-select-breakpoint";
import { CloseIcon, EditIcon, ResetIcon, SaveIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import useBreakpointsDataService from "~/domain/breakpoints/useBreakpointsDataService";
import { BreakpointFlat } from "~/domain/breakpoints/interfaces";

export default function MediaQueryEdit() {
  const {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    changeCurrentBreakpoint,
    closeEditCurrentSelector,
  } = useMediaQueriesBuilderService();

  const { getTokenValues } = useMediaQueriesQueryService();
  const { htmlSelectors } = useHtmlSelectorsSelector();

  const [selectors, setSelectors] = useState<Selectors | null>(null);

  const appScrollbarStyle = useCustomScrollbar();

  function onchangeCurrentBreakpoint(e: React.ChangeEvent<HTMLInputElement>) {
    const bp = e.target.value as BreakpointId;
    changeCurrentBreakpoint(bp);
  }

  useEffect(() => {
    setSelectors(htmlSelectors);
  }, [htmlSelectors]);

  return (
    <VStackBox gap="1.5rem">
      <FormControlSelectBreakpoint
        onChange={onchangeCurrentBreakpoint}
        value={currentBreakpointId}
      />
      <VStackBox
        w="100%"
        gap="1rem"
        paddingRight=".5rem"
        maxH="600px"
        overflow="auto"
        css={appScrollbarStyle}
      >
        {currentBreakpointId !== "" &&
          selectors &&
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
                <Grid
                  w="100%"
                  gridTemplateColumns={".75fr 1fr"}
                  columnGap="1rem"
                >
                  <VStackBox minH="65px">
                    <Text
                      color="primary.500"
                      fontSize={"sm"}
                      fontWeight={700}
                      flexGrow={2}
                    >
                      {s.value}
                    </Text>
                    <SelectorActions selectorId={s.key} />
                  </VStackBox>
                  {s.key !== currentSelectorId && (
                    <SelectorCurrentProps
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
                    <SelectorFormProps selectorId={s.key} />
                  )}
              </Box>
            );
          })}
      </VStackBox>
    </VStackBox>
  );
}

function SelectorActions({ selectorId }: { selectorId: SelectorId }) {
  const {
    entityState,
    currentBreakpointId,
    currentSelectorId,
    minFontSize,
    maxFontSize,
    editCurrentSelector,
  } = useMediaQueriesBuilderService();

  const { saveMediaQuery, deleteMediaQuery } = useMediaQueriesService();

  return (
    <HStack spacing={1}>
      <ActionButton
        label="Edit Selector"
        onClick={() => editCurrentSelector(selectorId)}
      >
        <EditIcon />
      </ActionButton>
      <ActionButton
        label="Reset Selector"
        onClick={() => deleteMediaQuery(selectorId)}
      >
        <ResetIcon />
      </ActionButton>
      {entityState === SelectorEntityState.edit &&
        currentSelectorId === selectorId && (
          <ActionButton
            label="Save Selector"
            onClick={saveMediaQuery}
            isDisabled={
              currentBreakpointId === "" ||
              currentSelectorId === "" ||
              currentBreakpointId === "no-selected" ||
              currentSelectorId === "no-selected" ||
              minFontSize === "" ||
              maxFontSize === ""
            }
          >
            <SaveIcon />
          </ActionButton>
        )}
    </HStack>
  );
}

function SelectorCurrentProps({
  minFontSize,
  maxFontSize,
  lineHeight,
}: {
  minFontSize: number;
  maxFontSize: number;
  lineHeight: number;
}) {
  const labelProps = {
    color: "secondary.500",
    fontSize: "smaller",
  };

  const valueProps = {
    color: "primary.500",
    fontSize: "smaller",
  };

  const labelGroupProps = {
    spacing: 2,
    justify: "space-between",
    w: "100%",
  };

  return (
    <VStackBox w="100%" gap=".15rem">
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Font Size (MIN)</Text>
        <Text {...valueProps}>{`${minFontSize}rem`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Font Size (MAX)</Text>
        <Text {...valueProps}>{`${maxFontSize}rem`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Line Height</Text>
        <Text {...valueProps}>{`${lineHeight}%`}</Text>
      </HStack>
    </VStackBox>
  );
}

export function SelectorFormProps({ selectorId }: { selectorId: SelectorId }) {
  const {
    minFontSize,
    maxFontSize,
    lineHeight,
    changeMinFontSize,
    changeMaxFontSize,
    changeLineHeight,
  } = useMediaQueriesBuilderService();

  function onChangeMinFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMinFontSize(e.target.value);
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMaxFontSize(e.target.value);
  }

  function onChangeLineHeight(e: React.ChangeEvent<HTMLInputElement>) {
    changeLineHeight(e.target.value);
  }

  return (
    <VStackBox w="100%" gap=".5rem" justify="space-between" mt="1rem">
      <FormControlInputNumber
        id={`minFontSize-${selectorId}`}
        label="Font Size (MIN)"
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={minFontSize}
        onChange={(e) => onChangeMinFontSize(e)}
        maxW="50px"
      />
      <FormControlInputNumber
        id={`maxFontSize-${selectorId}`}
        label="Font Size (MAX)"
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={maxFontSize}
        onChange={(e) => onChangeMaxFontSize(e)}
        maxW="50px"
      />
      <FormControlInputNumber
        id={`lineHeight-${selectorId}`}
        label="Line Height"
        labelFontSize="smaller"
        leftUnit="%"
        value={lineHeight}
        unitFontSize="smaller"
        onChange={(e) => onChangeLineHeight(e)}
        maxW="50px"
      />
    </VStackBox>
  );
}
