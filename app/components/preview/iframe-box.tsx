import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import useMediaQueriesStylesheet from "~/domain/stylesheet/useMediaQueriesStylesheet";
import usePostMessageService from "~/domain/preview/usePostMessageService";
import usePreviewSettings from "~/domain/preview/usePreviewSettings";
import usePreviewIframeRefsSelector from "~/context/preview/hooks/usePreviewIframeRefsSelector";

export default function IframeBox({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  // const { typography } = useTypographySelector();
  // const { getMediaQueriesStylesheet, getStyleSheet } =
  //   useMediaQueriesStylesheet();
  const { previewUrl } = usePreviewUrl();
  // const { postMessage } = usePostMessageService();
  const { iframeDefaultURL: DEFAULT_URL } = usePreviewSettings();
  const { actions } = usePreviewIframeRefsSelector();

  // const [iframeReloadKey, setIframeReloadKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // function onIframeLoad() {
  //   const mediaQueriesStylesheet = getMediaQueriesStylesheet(true);
  //   const typographyStyleSheet = getStyleSheet(true);

  //   postMessage({
  //     iframeRef,
  //     message: {
  //       stylesheetTypographyCode: typographyStyleSheet,
  //       stylesheetMediaQueriesCode: mediaQueriesStylesheet,
  //       fontHeading: typography.headings,
  //       fontBody: typography.body,
  //     },
  //   });
  // }

  // reload the frame when the typography object change
  // useEffect(() => {
  //   setIframeReloadKey(iframeReloadKey + 1);
  // }, [typography]);

  useEffect(() => {
    if (iframeRef.current) {
      actions.PREVIEW__ADD_IFRAME_REF.dispatch(iframeRef);
    }

    return () => {
      actions.PREVIEW__REMOVE_IFRAME_REF.dispatch(iframeRef);
    };
  }, []);

  return (
    <>
      <Box
        className="preview"
        width={width}
        height={height}
        transition="all 500ms ease"
      >
        <iframe
          // key={iframeReloadKey}
          name={`preview-iframe-${width}-${height}`}
          ref={iframeRef}
          src={
            previewUrl || previewUrl === "https://" ? previewUrl : DEFAULT_URL
          }
          width="100%"
          height="100%"
          // onLoad={onIframeLoad}
          style={{
            borderRadius: "5px",
          }}
        ></iframe>
      </Box>
    </>
  );
}
