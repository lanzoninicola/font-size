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
