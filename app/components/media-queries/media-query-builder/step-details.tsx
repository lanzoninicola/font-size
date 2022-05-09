import { HStack, Text } from "@chakra-ui/react";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";

export default function StepDetails({
  minFontSize,
  maxFontSize,
  lineHeight,
  marginBottom,
  fontFamily,
}: {
  minFontSize: number;
  maxFontSize: number;
  lineHeight: number;
  marginBottom: number;
  fontFamily: string;
}) {
  const { currentBreakpointId } = useMediaQueriesBuilderService();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

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

  function breakpointViewportMinSize() {
    const { minWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return minWidth;
  }

  function breakpointViewportMaxSize() {
    const { maxWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return maxWidth;
  }

  return (
    <VStackBox w="100%" gap=".15rem">
      <HStack {...labelGroupProps}>
        <Text
          {...labelProps}
        >{`Font Size at ${breakpointViewportMinSize()}px`}</Text>
        <Text {...valueProps}>{`${minFontSize}rem`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text
          {...labelProps}
        >{`Font Size at ${breakpointViewportMaxSize()}px`}</Text>
        <Text {...valueProps}>{`${maxFontSize}rem`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Line Height</Text>
        <Text {...valueProps}>{`${lineHeight}%`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Margin Bottom</Text>
        <Text {...valueProps}>{`${marginBottom}rem`}</Text>
      </HStack>
      <HStack {...labelGroupProps}>
        <Text {...labelProps}>Font Family</Text>
        <Text {...valueProps}>{`${fontFamily}`}</Text>
      </HStack>
    </VStackBox>
  );
}
