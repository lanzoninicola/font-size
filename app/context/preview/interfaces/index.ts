export interface PreviewContextData {
  previewWindows: number;
  previewUrl: string;
  setPreviewWindows: (previewWindows: number) => void;
  setPreviewUrl: (url: string) => void;
}
