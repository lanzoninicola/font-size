import { PreviewDevice } from "~/context/preview/types";

import usePreviewSettings from "./usePreviewSettings";

export default function usePreviewWindowsService() {
  const {
    iframeDefaultWidth: DEFAULT_WIDTH,
    iframeDefaultHeight: DEFAULT_HEIGHT,
    name: DEFAULT_DEVICE_NAME,
  } = usePreviewSettings();

  function getNewPreviewDevice(
    width?: number,
    height?: number,
    name?: string
  ): PreviewDevice {
    return {
      width: width || DEFAULT_WIDTH,
      height: height || DEFAULT_HEIGHT,
      name: name || DEFAULT_DEVICE_NAME,
    };
  }

  return {
    getNewPreviewDevice,
  };
}
