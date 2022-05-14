export interface PreviewContext {
  devices: YesVizDeviceInfo[];
  previewWindows: PreviewDevice[];
  previewUrl: string;
  zoom: number;
  iframeRefs: React.RefObject<HTMLIFrameElement>[];
  setDevices: (devices: YesVizDeviceInfo[]) => void;
  setPreviewWindows: (previewWindows: PreviewDevice[]) => void;
  setPreviewUrl: (url: string) => void;
  setZoom: (zoom: number) => void;
  setIframeRefs: (iframeRefs: React.RefObject<HTMLIFrameElement>[]) => void;
}

export interface PreviewDevice {
  width: number;
  height: number;
  deviceName?: string;
}

export enum DeviceTypes {
  mobile = "Mobile",
  tablet = "Tablet",
  laptop = "Laptop",
  watch = "Watch",
  unknown = "Unknown",
}

export interface DeviceViewportSize {
  width: number;
  height: number;
}

export interface BaseDeviceInfo {
  type: DeviceTypes;
  viewportSize: DeviceViewportSize;
  name: string;
}

export interface YesVizDeviceInfo extends BaseDeviceInfo {
  screenSize: string;
  devicePixelRatio: string;
  ppi: string;
  cssPpi: string;
}
