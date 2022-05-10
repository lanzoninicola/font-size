import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useFontBodySelector from "~/context/type-scale-calculator-form/hooks/useFontBodySelector";
import useFontHeadingSelector from "~/context/type-scale-calculator-form/hooks/useFontHeadingSelector";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";
import usePostMessageService from "~/domain/preview/usePostMessageService";
import usePreviewSettings from "~/domain/preview/usePreviewSettings";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { fontHeading } = useFontHeadingSelector();
  const { fontBody } = useFontBodySelector();
  const { mediaQueries } = useMediaQueriesSelector();
  const { getCSSStylesheet } = useCSSCodeBlock();
  const { previewUrl } = usePreviewUrl();
  const { postMessage } = usePostMessageService();
  const { iframeDefaultURL } = usePreviewSettings();

  const [iframeReloadKey, setIframeReloadKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const DEFAULT_URL = iframeDefaultURL;

  function sendMessage() {
    const codeBlock = getCSSStylesheet(true);

    postMessage({
      iframeRef,
      message: {
        stylesheetCode: codeBlock,
        fontHeading: {
          fontFamily: fontHeading.fontFamily,
          fontWeight: fontHeading.fontWeight,
        },
        fontBody: {
          fontFamily: fontBody.fontFamily,
          fontWeight: fontBody.fontWeight,
        },
      },
    });
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
