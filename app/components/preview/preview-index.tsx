import { Box, HStack } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";
import FlippedContainer from "../layout/flipped-container";
import VStackBox from "../shared/vstack-wrapper";

import PreviewItem from "./preview-item";
import PreviewToolbar from "./preview-toolbar";

export default function PreviewIndex() {
  const { previewWindows } = usePreviewWindowsSelector();
  const { zoom } = usePreviewZoomSelector();

  return (
    <VStackBox gap="1rem" id="preview-index">
      <PreviewToolbar />
      <FlippedContainer>
        <Box w="100%" transform={`rotateX(180deg) scale(${zoom / 100})`}>
          <HStack
            flex={"1 0 850px"}
            p="1rem"
            w="100%"
            gap="2rem"
            align={"flex-start"}
          >
            <>
              {previewWindows.map((_, idx) => (
                <PreviewItem key={idx} idx={idx} />
              ))}
            </>
          </HStack>
        </Box>
      </FlippedContainer>
    </VStackBox>
  );
}
