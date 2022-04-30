import { Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoaderData } from "remix";
import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import { DeviceTypes, YesVizDeviceInfo } from "~/context/preview/interfaces";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import usePreviewDevicesService from "~/domain/preview/usePreviewDevicesService";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";

import FlippedContainer from "../layout/flipped-container";
import InnerContentColumn from "../layout/inner-content-column";
import PreviewItem from "./preview-item";

type LoaderData = YesVizDeviceInfo[];

export default function PreviewContent() {
  const devicesData: LoaderData = useLoaderData();
  const { devices, setDevices } = usePreviewDevicesSelector();

  const { currentBreakpointId } = useMediaQueriesBuilderService();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

  const { previewWindows } = usePreviewWindowsSelector();
  const { getSmallestDevice, getLargestDevice } = usePreviewDevicesService();
  const { addBulkWindow, removeAllWindows } = usePreviewWindowsService();
  const { zoom } = usePreviewZoomSelector();

  function onChangeBreakpointLoadWindows() {
    if (currentBreakpointId === "") {
      return;
    }

    const { minWidth, maxWidth } =
      getViewportSizeByBreakpointId(currentBreakpointId);

    const smallestDevice = getSmallestDevice(minWidth);
    const largestDevice = getLargestDevice(maxWidth);

    if (smallestDevice && largestDevice) {
      const { width: smallestWidth, height: smallestHeight } =
        smallestDevice.viewportSize;
      const { width: largetstWidth, height: largestHeight } =
        largestDevice.viewportSize;

      removeAllWindows();

      addBulkWindow([
        { width: smallestWidth, height: smallestHeight },
        { width: largetstWidth, height: largestHeight },
      ]);
    }
  }

  useEffect(() => {
    setDevices(devicesData);
  }, []);

  useEffect(() => {
    onChangeBreakpointLoadWindows();
  }, [currentBreakpointId]);

  return (
    <InnerContentColumn>
      <FlippedContainer>
        <Box
          w="100%"
          minH="100vh"
          background="radial-gradient(66.65% 50% at 50% 50%, #686680 0%, #302F3C 100%);"
        >
          <Box w="100%" transform={`scale(${zoom / 100})`}>
            <HStack
              flex={"1 0 850px"}
              w="100%"
              gap="2rem"
              align={"flex-start"}
              paddingLeft="2rem"
              paddingTop="1rem"
            >
              <>
                {previewWindows.map((_, idx) => (
                  <PreviewItem key={idx} idx={idx} />
                ))}
              </>
            </HStack>
          </Box>
        </Box>
      </FlippedContainer>
    </InnerContentColumn>
  );
}
