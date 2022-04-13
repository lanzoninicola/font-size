import { useContextSelector } from "use-context-selector";

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

  return {
    previewWindows,
    setPreviewWindows,
  };
}
