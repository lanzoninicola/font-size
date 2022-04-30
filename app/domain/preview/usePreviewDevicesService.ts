import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import { DeviceTypes, YesVizDeviceInfo } from "~/context/preview/interfaces";

type OrderOrientation = "ASC" | "DESC";

export default function usePreviewDevicesService() {
  const { devices } = usePreviewDevicesSelector();

  function getDevicesByType(type: DeviceTypes) {
    return devices.filter((device) => device.type === type);
  }

  function orderByViewportWidth(orientation: OrderOrientation) {
    // return devices order by viewport width desc
    return devices.sort((a, b) => {
      if (orientation === "ASC") {
        return a.viewportSize.width - b.viewportSize.width;
      } else {
        return b.viewportSize.width - a.viewportSize.width;
      }
    });
  }

  function getSmallestDevice(minWidth?: number): YesVizDeviceInfo | null {
    if (devices.length === 0) {
      return null;
    }

    const devicesOrdered = orderByViewportWidth("ASC");

    if (minWidth) {
      // get the device that has the smallest viewport width that is greater than or equal to the minWidth
      const device = devicesOrdered.find(
        (device) => device.viewportSize.width >= minWidth
      );

      if (device) {
        return device;
      }
    }

    // return the smallest device
    return devicesOrdered[0];
  }

  function getLargestDevice(maxWidth?: number): YesVizDeviceInfo | null {
    if (devices.length === 0) {
      return null;
    }

    const devicesOrdered = orderByViewportWidth("DESC");

    if (maxWidth) {
      // get the device that has the largetst viewport width that is less than or equal to the maxWidth
      const device = devicesOrdered.find(
        (device) => device.viewportSize.width <= maxWidth
      );

      if (device) {
        return device;
      }
    }

    // return the largest device
    return devicesOrdered[0];
  }

  return {
    getDevicesByType,
    getSmallestDevice,
    getLargestDevice,
  };
}
