import usePreviewZoomSelector from "~/context/preview/hooks/usePreviewZoomSelector";

export default function usePreviewZoomService() {
  const ZOOM_OFFSET = 10;
  const { zoom, setZoom } = usePreviewZoomSelector();

  function zoomIn() {
    setZoom(zoom + ZOOM_OFFSET);
  }

  function zoomOut() {
    const nextZoom = zoom - ZOOM_OFFSET;
    if (nextZoom < 0) {
      return;
    }
    setZoom(zoom - ZOOM_OFFSET);
  }

  return {
    zoomIn,
    zoomOut,
  };
}
