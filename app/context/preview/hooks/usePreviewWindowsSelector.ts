import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import usePreviewDevicesService from "~/domain/preview/usePreviewDevicesService";
import usePreviewSettings from "~/domain/preview/usePreviewSettings";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

import { PreviewDevice } from "../interfaces";
import { PreviewContextData } from "../preview-context";

export default function usePreviewWindowsSelector() {
  const previewWindows = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.previewWindows
  );

  const setPreviewWindows = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.setPreviewWindows
  );

  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const { getNewPreviewDevice } = usePreviewWindowsService();
  const { getSmallestDevice, getLargestDevice } = usePreviewDevicesService();

  const actions = {
    PREVIEW_WINDOWS__ADD_WINDOW: {
      dispatch: (payload: PreviewDevice) => addWindow(payload),
    },
    PREVIEW_WINDOWS__ADD_BULK_WINDOW: {
      dispatch: (payload: PreviewDevice[]) => addBulkWindow(payload),
    },
    PREVIEW_WINDOWS__REMOVE_WINDOW: {
      dispatch: (payload: number) => removeWindow(payload),
    },
    PREVIEW_WINDOWS__REMOVE_ALL_WINDOWS: {
      dispatch: () => removeAllWindows(),
    },
    PREVIEW_WINDOWS__CHANGE_WINDOW_WIDTH: {
      dispatch: (payload: { id: number; width: string }) =>
        changeWindowWidth(payload.id, payload.width),
    },
    PREVIEW_WINDOWS__CHANGE_WINDOW_HEIGHT: {
      dispatch: (payload: { id: number; height: string }) =>
        changeWindowHeight(payload.id, payload.height),
    },
    PREVIEW_WINDOWS__SELECTED_EMPTY_BREAKPOINTS: {
      dispatch: () => removeAllWindows(),
    },
    PREVIEW_WINDOWS__SELECTED_BREAKPOINTS: {
      dispatch: (payload: BreakpointId) =>
        loadPreviewWindowsAccordingToBreakpoint(payload),
    },
  };

  function loadPreviewWindowsAccordingToBreakpoint(breakpointId: BreakpointId) {
    const { minWidth, maxWidth } = getViewportSizeByBreakpointId(breakpointId);

    const smallestDevice = getSmallestDevice(minWidth);
    const largestDevice = getLargestDevice(maxWidth);

    if (smallestDevice && largestDevice) {
      const previewSmallestDevice = getNewPreviewDevice(
        smallestDevice.viewportSize.width,
        smallestDevice.viewportSize.height,
        smallestDevice.name
      );

      const previewLargestDevice = getNewPreviewDevice(
        largestDevice.viewportSize.width,
        largestDevice.viewportSize.height,
        largestDevice.name
      );

      actions.PREVIEW_WINDOWS__ADD_BULK_WINDOW.dispatch([
        previewSmallestDevice,
        previewLargestDevice,
      ]);
    }
  }

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
    const nextState = [...devices];

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

  useEffect(() => {
    if (previewWindows === undefined) {
      throw new Error(
        "usePreviewWindowsSelector is being using outside its context"
      );
    }
  }, []);

  return {
    previewWindows,
    actions,
  };
}
