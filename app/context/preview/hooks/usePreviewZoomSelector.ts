import { useContextSelector } from "use-context-selector";

import { PreviewContextData } from "../preview-context";

export default function usePreviewZoomSelector() {
  const zoom = useContextSelector(PreviewContextData, (ctx) => ctx?.zoom);

  const setZoom = useContextSelector(PreviewContextData, (ctx) => ctx?.setZoom);

  return {
    zoom,
    setZoom,
  };
}
