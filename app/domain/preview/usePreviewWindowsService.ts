import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import { DeviceViewportSize, PreviewItem } from "~/context/preview/interfaces";
import SETTINGS from "../settings";
import parseDecimalNumber from "../utilities/parseDecimalNumber";

export default function usePreviewWindowsService() {
  const DEFAULT_WIDTH = SETTINGS.preview.iframeDefaultWidth;
  const DEFAULT_HEIGHT = SETTINGS.preview.iframeDefaultHeight;

  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();

  /**
   * @description Add new preview window. The new window is added to the begin of the list.
   * The size of the new window is set to the default value if a width and height have not given.
   */
  function addWindow(userWidth?: number, userHeight?: number) {
    const nextState = [...previewWindows];

    const newItem: PreviewItem = {
      width: userWidth || DEFAULT_WIDTH,
      height: userHeight || DEFAULT_HEIGHT,
    };

    nextState.unshift(newItem);
    setPreviewWindows(nextState);
  }

  /**
   * @description Add new preview windows. The new window is added to the begin of the list.
   * The size of the new window is set to the default value if a width and height have not given.
   */
  function addBulkWindow(sizes: DeviceViewportSize[]) {
    const nextState = [...previewWindows];

    const newItems: PreviewItem[] = sizes.map((size) => ({
      width: size.width,
      height: size.height,
    }));

    nextState.unshift(...newItems);
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

  return {
    addWindow,
    addBulkWindow,
    removeWindow,
    removeAllWindows,
    changeWindowWidth,
    changeWindowHeight,
  };
}
