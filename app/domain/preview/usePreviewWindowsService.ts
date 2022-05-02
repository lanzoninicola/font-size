import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import { PreviewDevice } from "~/context/preview/interfaces";

import parseDecimalNumber from "../utilities/parseDecimalNumber";
import PREVIEW_SETTINGS from "./settings";

export default function usePreviewWindowsService() {
  const DEFAULT_WIDTH = PREVIEW_SETTINGS.iframeDefaultWidth;
  const DEFAULT_HEIGHT = PREVIEW_SETTINGS.iframeDefaultHeight;
  const DEFAULT_DEVICE_NAME = PREVIEW_SETTINGS.deviceName;

  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();

  /**
   * @description Add new preview window. The new window is added to the begin of the list.
   * The size of the new window is set to the default value if a width and height have not given.
   */
  function addWindow(device: PreviewDevice) {
    const nextState = [...previewWindows];

    nextState.unshift(device);
    setPreviewWindows(nextState);
  }

  /**
   * @description Add new preview windows. The new window is added to the begin of the list.
   * The size of the new window is set to the default value if a width and height have not given.
   */
  function addBulkWindow(devices: PreviewDevice[]) {
    const nextState = [...previewWindows];

    nextState.unshift(...devices);
    setPreviewWindows(nextState);
  }

  /**
   * @description Remove the selected window from the previewWindows array
   * @param id of the window to remove
   */
  function removeWindow(id: number) {
    let nextState = [...previewWindows];
    nextState.splice(id, 1);
    setPreviewWindows(nextState);
  }

  /**
   * @description Remove all the windows from the previewWindows array
   */
  function removeAllWindows() {
    setPreviewWindows([]);
  }

  /**
   * @description Update the width of the selected window
   * @param id of the window to update
   * @param width of the window
   * */
  function changeWindowWidth(id: number, width: string) {
    const nextState = [...previewWindows];
    const nextWidth = parseDecimalNumber(width);
    nextState[id].width = nextWidth;
    setPreviewWindows(nextState);
  }

  /**
   * @description Update the height of the selected window
   * @param id of the window to update
   * @param height of the window
   * */
  function changeWindowHeight(id: number, height: string) {
    const nextState = [...previewWindows];
    const nextHeight = parseDecimalNumber(height);
    nextState[id].height = nextHeight;
    setPreviewWindows(nextState);
  }

  function getNewPreviewDevice(
    width?: number,
    height?: number,
    deviceName?: string
  ): PreviewDevice {
    return {
      width: width || DEFAULT_WIDTH,
      height: height || DEFAULT_HEIGHT,
      deviceName: deviceName || DEFAULT_DEVICE_NAME,
    };
  }

  return {
    addWindow,
    addBulkWindow,
    removeWindow,
    removeAllWindows,
    changeWindowWidth,
    changeWindowHeight,
    getNewPreviewDevice,
  };
}
