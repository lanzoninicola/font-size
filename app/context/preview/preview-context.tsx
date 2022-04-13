import { useState } from "react";
import { createContext } from "use-context-selector";

export interface PreviewContext {
  previewWindows: number;
  previewUrl: string;
  setPreviewWindows: (previewWindows: number) => void;
  setPreviewUrl: (url: string) => void;
}

export const PreviewContextData = createContext<PreviewContext>(
  {} as PreviewContext
);

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [previewWindows, setPreviewWindows] = useState(1);
  const [previewUrl, setPreviewUrl] = useState("");

  return (
    <PreviewContextData.Provider
      value={{
        previewWindows,
        previewUrl,
        setPreviewWindows,
        setPreviewUrl,
      }}
    >
      {children}
    </PreviewContextData.Provider>
  );
}
