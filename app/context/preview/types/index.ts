export interface PreviewContext {
  devices: YesVizDeviceInfo[];
  previewWindows: PreviewDevice[];
  previewUrl: string;
  zoom: number;
  setDevices: (devices: YesVizDeviceInfo[]) => void;
  setPreviewWindows: (previewWindows: PreviewDevice[]) => void;
  setPreviewUrl: (url: string) => void;
  setZoom: (zoom: number) => void;
}

export interface PreviewDevice {
  width: number;
  height: number;
  name?: string;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
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
