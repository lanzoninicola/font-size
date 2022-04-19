import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BreakpointId, Selector } from "~/context/font-size/interfaces";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

import ToolbarButton from "../layout/toolbar-button";
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
        currentBreakpointId &&
        Object.keys(mediaQueries[currentBreakpointId]).map(
          (selectorId, index) => {
            if (!currentBreakpointId) {
              return null;
            }

            const mediaQueryData =
              mediaQueries[currentBreakpointId][selectorId];

            return (
              <HStack
                key={index}
                justify={"space-between"}
                w="100%"
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "gray.100",
                  borderRadius: "5px",
                  paddingLeft: "1rem",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Text color="secondary.700">{selectorId}</Text>
                <HStack gap="1.5rem">
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
                  <HStack>
                    <ToolbarButton
                      label="Edit media query"
                      noHoverbg
                      onClick={() =>
                        onEditMediaQuery(currentBreakpointId, selectorId)
                      }
                    >
                      <EditIcon ariaLabel="Edit media query" color="green" />
                    </ToolbarButton>
                    <ToolbarButton
                      label="Remove media query"
                      noHoverbg
                      onClick={() =>
                        onDeleteMediaQuery(currentBreakpointId, selectorId)
                      }
                    >
                      <TrashIcon
                        ariaLabel="Remove media query"
                        color="green"
                        size={20}
                      />
                    </ToolbarButton>
                  </HStack>
                </HStack>
              </HStack>
            );
          }
        )}
    </VStackBox>
  );
}
