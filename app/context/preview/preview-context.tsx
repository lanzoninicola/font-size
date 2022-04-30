import { useState } from "react";
import { createContext } from "use-context-selector";

import { PreviewItem, YesVizDeviceInfo } from "./interfaces";

export interface PreviewContext {
  devices: YesVizDeviceInfo[];
  previewWindows: PreviewItem[];
  previewUrl: string;
  zoom: number;
  setDevices: (devices: YesVizDeviceInfo[]) => void;
  setPreviewWindows: (previewWindows: PreviewItem[]) => void;
  setPreviewUrl: (url: string) => void;
  setZoom: (zoom: number) => void;
}

export const PreviewContextData = createContext<PreviewContext>(
  {} as PreviewContext
);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<YesVizDeviceInfo[]>([]);
  const [previewWindows, setPreviewWindows] = useState<PreviewItem[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [zoom, setZoom] = useState(100);

  return (
    <PreviewContextData.Provider
      value={{
        devices,
        previewWindows,
        previewUrl,
        zoom,
        setDevices,
        setPreviewWindows,
        setPreviewUrl,
        setZoom,
      }}
    >
      {children}
    </PreviewContextData.Provider>
  );
}
