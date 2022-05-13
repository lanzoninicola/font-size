import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useStylesheet from "~/domain/stylesheet/useStylesheet";
import usePostMessageService from "~/domain/preview/usePostMessageService";
import usePreviewSettings from "~/domain/preview/usePreviewSettings";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const { typography } = useTypographySelector();
  const { getMediaQueriesStylesheet, getTypographyStyleSheet } =
    useStylesheet();
  const { previewUrl } = usePreviewUrl();
  const { postMessage } = usePostMessageService();
  const { iframeDefaultURL: DEFAULT_URL } = usePreviewSettings();

  const [iframeReloadKey, setIframeReloadKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  function onIframeLoad() {
    const mediaQueriesStylesheet = getMediaQueriesStylesheet(true);
    const typographyStyleSheet = getTypographyStyleSheet(true);

    postMessage({
      iframeRef,
      message: {
        stylesheetTypographyCode: typographyStyleSheet,
        stylesheetMediaQueriesCode: mediaQueriesStylesheet,
        fontHeading: typography.headings,
        fontBody: typography.body,
      },
    });
  }

  // reload the frame when the typography object change
  useEffect(() => {
    setIframeReloadKey(iframeReloadKey + 1);
  }, [typography]);

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
          onLoad={onIframeLoad}
          style={{
            borderRadius: "5px",
          }}
        ></iframe>
      </Box>
    </>
  );
}
