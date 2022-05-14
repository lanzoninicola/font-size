import { Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoaderData } from "remix";
import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import { YesVizDeviceInfo } from "~/context/preview/types";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";
import usePreviewDevicesService from "~/domain/preview/usePreviewDevicesService";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import FlippedContainer from "../layout/flipped-container";

import PreviewDevice from "./preview-device";

type LoaderData = YesVizDeviceInfo[];

export default function PreviewContent() {
  const devicesData: LoaderData = useLoaderData();
  const { setDevices } = usePreviewDevicesSelector();

  const { previewWindows } = usePreviewWindowsSelector();
  const { zoom } = usePreviewZoomSelector();

  useEffect(() => {
    setDevices(devicesData);
  }, []);

  return (
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
                <PreviewDevice key={idx} idx={idx} />
              ))}
            </>
          </HStack>
        </Box>
      </Box>
    </FlippedContainer>
  );
}
