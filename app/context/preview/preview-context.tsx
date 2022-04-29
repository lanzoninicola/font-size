import { useState } from "react";
import { createContext } from "use-context-selector";
import SETTINGS from "~/domain/settings";
import { PreviewItem } from "./interfaces";

export interface PreviewContext {
  previewWindows: PreviewItem[];
  previewUrl: string;
  zoom: number;
  setPreviewWindows: (previewWindows: PreviewItem[]) => void;
  setPreviewUrl: (url: string) => void;
  setZoom: (zoom: number) => void;
}

export const PreviewContextData = createContext<PreviewContext>(
  {} as PreviewContext
);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [previewWindows, setPreviewWindows] = useState<PreviewItem[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [zoom, setZoom] = useState(100);

  return (
    <PreviewContextData.Provider
      value={{
        previewWindows,
        previewUrl,
        zoom,
        setPreviewWindows,
        setPreviewUrl,
        setZoom,
      }}
    >
      {children}
    </PreviewContextData.Provider>
  );
}
