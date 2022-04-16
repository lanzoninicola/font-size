import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useMediaQueriesSelector from "~/context/font-size/hooks/useMediaQueriesSelector";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";
import usePostMessageService from "~/domain/preview/usePostMessageService";
import SETTINGS from "~/domain/settings";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { mediaQueries } = useMediaQueriesSelector();
  const { codeBlock } = useCSSCodeBlock(true);
  const { previewUrl } = usePreviewUrl();
  const { postMessage } = usePostMessageService();

  const [iframeReloadKey, setIframeReloadKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const DEFAULT_URL = SETTINGS.preview.iframeDefaultURL;

  function sendMessage() {
    postMessage({ iframeRef, message: codeBlock });
  }

  // reload the frame when the media queries change and a new url is set
  useEffect(() => {
    setIframeReloadKey(iframeReloadKey + 1);
  }, [mediaQueries, previewUrl]);

  return (
    <>
      <Box
        className="preview"
        width={width}
        height={height}
        transition="all 500ms ease"
      >
        <iframe
          key={iframeReloadKey}
          name="iframe-preview"
          ref={iframeRef}
          src={
            previewUrl || previewUrl === "https://" ? previewUrl : DEFAULT_URL
          }
          width="100%"
          height="100%"
          onLoad={sendMessage}
          style={{
            borderRadius: "5px",
          }}
        ></iframe>
      </Box>
    </>
  );
}
