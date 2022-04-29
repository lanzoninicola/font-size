import { Box, HStack } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";

import FlippedContainer from "../layout/flipped-container";
import InnerContentColumn from "../layout/inner-content-column";
import PreviewItem from "./preview-item";

export default function PreviewIndex() {
  const { previewWindows } = usePreviewWindowsSelector();
  const { zoom } = usePreviewZoomSelector();

  return (
    <InnerContentColumn>
      <FlippedContainer>
        <Box w="100%" transform={`rotateX(180deg) scale(${zoom / 100})`}>
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
      </FlippedContainer>
    </InnerContentColumn>
  );
}
