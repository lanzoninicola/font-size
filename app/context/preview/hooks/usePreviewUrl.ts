import { useContextSelector } from "use-context-selector";

import { PreviewContextData } from "../preview-context";

export default function usePreviewUrl() {
  const previewUrl = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.previewUrl
  );

  const setPreviewUrl = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.setPreviewUrl
  );

  return {
    previewUrl,
    setPreviewUrl,
  };
}
