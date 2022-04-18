import { HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import useMediaQueryBuilderContext from "~/context/media-query-builder/hooks/useMediaQueryBuilderContext";

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
  const mqc = useMediaQueryBuilderContext();
  const { mediaQueries } = useMediaQueriesSelector();

  return (
    <VStackBox w="100%" gap=".5rem" paddingLeft="2rem" paddingRight="1rem">
      {mediaQueries &&
        mqc.currentBreakpointId &&
        Object.keys(mediaQueries[mqc.currentBreakpointId]).map(
          (selector, index) => {
            if (!mqc.currentBreakpointId) {
              return null;
            }

            const mediaQueryData =
              mediaQueries[mqc.currentBreakpointId][selector];

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
                <Text color="secondary.700">{selector}</Text>
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
                    <ToolbarButton label="Edit media query" noHoverbg>
                      <EditIcon ariaLabel="Edit media query" color="green" />
                    </ToolbarButton>
                    <ToolbarButton label="Remove media query" noHoverbg>
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
