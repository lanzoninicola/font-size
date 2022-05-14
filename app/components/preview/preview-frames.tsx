import { Box, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoaderData } from "remix";
import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import { YesVizDeviceInfo } from "~/context/preview/types";

import FlippedContainer from "../layout/flipped-container";
import PreviewFrame from "./preview-frame/preview-frame";

type LoaderData = YesVizDeviceInfo[];

export default function PreviewFrames() {
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
              {previewWindows.map((device, idx) => {
                return <PreviewFrame key={idx} device={device} />;
              })}
            </>
          </HStack>
        </Box>
      </Box>
    </FlippedContainer>
  );
}
