export interface PreviewItem {
  width: number;
  height: number;
}

export enum DeviceTypes {
  mobile = "Mobile",
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
