import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { codeBlock } = useCSSCodeBlock();
  const { mediaQueries } = useMediaQueryService();
  const [iframeReloadKey, setIframeReloadKey] = useState(0);
  const { previewUrl, setPreviewUrl } = usePreviewUrl();

  function applyStyle() {
    if (document) {
      console.log("im here");
      const iframes = document.querySelectorAll("iframe[name=iframe-preview]");

      const iframeHTMLElement = iframes[0] as HTMLIFrameElement;

      console.log(iframeHTMLElement.contentWindow);
      console.log(iframeHTMLElement.contentDocument);

      if (iframes.length > 0) {
        iframes.forEach((iframe) => {
          const iframeHTMLElement = iframe as HTMLIFrameElement;

          console.log(
            "iframeHTMLElement.contentDocument",
            iframeHTMLElement.contentDocument
          );

          if (!iframeHTMLElement.contentDocument) {
            return;
          }

          const iframeBody = iframeHTMLElement.contentDocument.body;

          if (!iframeBody) {
            return;
          }

          if (iframeHTMLElement.contentDocument.readyState === "complete") {
            const style = document.createElement("style");
            // style.textContent = `${codeBlock}`;
            style.textContent = `h1 {color: red;} h2 {color: blue;}`;

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
        // src={
        //   previewUrl || previewUrl === "https://"
        //     ? previewUrl
        //     : `/preview/content`
        // }
        src={"http://127.0.0.1:5500/index.html"}
        width="100%"
        height="100%"
        // onLoad={(e) => applyStyle(e)}
      ></iframe>
    </Box>
  );
}
