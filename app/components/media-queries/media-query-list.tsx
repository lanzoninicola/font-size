import { HStack, Text } from "@chakra-ui/react";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { Selector } from "~/context/font-size/interfaces";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import ActionButton from "../shared/action-button";
import EntityList from "../shared/entity-list";
import {
  EditIcon,
  LineHeightIcon,
  MaxFontSizeIcon,
  MinFontSizeIcon,
  TrashIcon,
} from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function MediaQueryList() {
  const {
    currentBreakpointId,
    mediaQueries,
    editMediaQuery,
    deleteMediaQuery,
  } = useMediaQueryService();

  function onEditMediaQuery(bp: BreakpointId, s: Selector) {
    editMediaQuery(bp, s);
  }

  function onDeleteMediaQuery(bp: BreakpointId, s: Selector) {
    deleteMediaQuery(bp, s);
  }

  return (
    <VStackBox w="100%" gap=".5rem" paddingLeft="2rem" paddingRight="1rem">
      {mediaQueries &&
        mediaQueries[currentBreakpointId] &&
        Object.keys(mediaQueries[currentBreakpointId]).map(
          (selectorId, index) => {
            if (!currentBreakpointId) {
              return;
            }

            if (!selectorId) {
              return;
            }

            const mediaQueryData =
              mediaQueries[currentBreakpointId][selectorId];

            return (
              <EntityList
                key={index}
                entityName={selectorId}
                onEdit={() => onEditMediaQuery(currentBreakpointId, selectorId)}
                onDelete={() =>
                  onDeleteMediaQuery(currentBreakpointId, selectorId)
                }
              >
                <HStack gap="1rem">
                  <HStack>
                    <MinFontSizeIcon color="green" />
                    <Text color="secondary.700">
                      {`${mediaQueryData.minFontSize}rem`}
                    </Text>
                  </HStack>
                  <HStack>
                    <MaxFontSizeIcon color="green" />
                    <Text color="secondary.700">
                      {`${mediaQueryData.maxFontSize}rem`}
                    </Text>
                  </HStack>
                  <HStack>
                    <LineHeightIcon color="green" />
                    <Text color="secondary.700">0.1</Text>
                  </HStack>
                </HStack>
              </EntityList>
            );
          }
        )}
    </VStackBox>
  );
}
