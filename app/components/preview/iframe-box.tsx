import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";
import SETTINGS from "~/domain/settings";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { codeBlock } = useCSSCodeBlock();
  const { mediaQueries } = useMediaQueryService();
  const [iframeReloadKey, setIframeReloadKey] = useState(0);
  const { previewUrl } = usePreviewUrl();

  const DEFAULT_URL = SETTINGS.preview.iframeDefaultURL;

  function sendMessage() {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(codeBlock, "*");
    }
  }

  useEffect(() => {
    setIframeReloadKey(iframeReloadKey + 1);
  }, [mediaQueries, width, height, previewUrl]);

  return (
    <>
      <Box
        className="preview"
        width={width}
        height={height}
        borderRadius={"5px"}
        transition="all 500ms ease"
      >
        <iframe
          key={iframeReloadKey}
          name="iframe-preview"
          ref={iframeRef}
          src={
            previewUrl || previewUrl === "https://" ? previewUrl : DEFAULT_URL
          }
          //src={previewUrl && previewUrl !== "" ? previewUrl : DEFAULT_URL}
          // src={"https://remix-vert-pi.vercel.app/"}
          // src={"/receiver.html"}
          width="100%"
          height="100%"
          onLoad={sendMessage}
        ></iframe>
      </Box>
    </>
  );
}
