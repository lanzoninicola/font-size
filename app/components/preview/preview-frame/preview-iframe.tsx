import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypographySelector from "~/context/app/hooks/useTypographySelector";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import { PreviewDevice } from "~/context/preview/types";
import usePreviewSettings from "~/domain/preview/usePreviewSettings";

interface PreviewIframeProps {
  device: PreviewDevice;
}

export default function PreviewIframe({ device }: PreviewIframeProps) {
  const { previewUrl } = usePreviewUrl();
  const { iframeDefaultURL: DEFAULT_URL } = usePreviewSettings();
  const { actions: previewActions } = usePreviewWindowsSelector();
  const { actions: typographyActions } = useTypographySelector();
  const { mediaQueries, actions: mediaQueriesActions } =
    useMediaQueriesSelector();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  function onIframeLoaded() {
    if (iframeRef.current) {
      previewActions.PREVIEW_WINDOWS__IFRAME_LOADED.dispatch({
        ...device,
        iframeRef: iframeRef,
      });

      typographyActions.TYPOGRAPHY__POST_MESSAGE_CURRENT_TYPOGRAPHY.dispatch();
      mediaQueriesActions.MEDIA_QUERIES__POST_MESSAGE_CURRENT_MEDIA_QUERIES.dispatch(
        mediaQueries
      );
    }
  }

  return (
    <>
      <Box
        className="preview"
        width={device.width}
        height={device.height}
        transition="all 500ms ease"
      >
        <iframe
          name={`preview-iframe-${String(device.width)}-${String(
            device.height
          )}`}
          ref={iframeRef}
          src={
            previewUrl || previewUrl === "https://" ? previewUrl : DEFAULT_URL
          }
          width="100%"
          height="100%"
          style={{
            borderRadius: "5px",
          }}
          onLoad={onIframeLoaded}
        ></iframe>
      </Box>
    </>
  );
}
