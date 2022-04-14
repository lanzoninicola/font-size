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
      console.log("sendMessage");
      window.postMessage("message from app", "*");

      if (iframeRef.current.contentDocument) {
        iframeRef.current.contentDocument.body.style.backgroundColor = "red";
      }
    }
  }

  function applyStyle() {
    if (document) {
      const iframes = document.querySelectorAll("iframe[name=iframe-preview]");

      const iframeHTMLElement = iframes[0] as HTMLIFrameElement;

      if (iframes.length > 0) {
        iframes.forEach((iframe) => {
          const iframeHTMLElement = iframe as HTMLIFrameElement;

          if (!iframeHTMLElement.contentDocument) {
            return;
          }

          const iframeBody = iframeHTMLElement.contentDocument.body;

          if (!iframeBody) {
            return;
          }

          if (iframeHTMLElement.contentDocument.readyState === "complete") {
            const style = document.createElement("style");
            style.textContent = `${codeBlock}`;

            iframeBody.appendChild(style);
          }
        });
      }
    }
  }

  useEffect(() => {
    setIframeReloadKey(iframeReloadKey + 1);
  }, [mediaQueries, width, height, previewUrl]);

  return (
    <>
      <Button onClick={sendMessage}>Send Message</Button>
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
          // src={
          //   previewUrl || previewUrl === "https://"
          //     ? previewUrl
          //     : ${DEFAULT_URL}
          // }
          //src={previewUrl && previewUrl !== "" ? previewUrl : DEFAULT_URL}
          src={"https://remix-vert-pi.vercel.app"}
          width="100%"
          height="100%"
          onLoad={() => applyStyle()}
        ></iframe>
      </Box>
    </>
  );
}
