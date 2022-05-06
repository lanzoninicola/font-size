import { useCallback } from "react";
import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import { DeviceTypes, YesVizDeviceInfo } from "~/context/preview/interfaces";

type SortOrientation = "ASC" | "DESC";

export default function usePreviewDevicesService() {
  const { devices } = usePreviewDevicesSelector();

  function getDevicesOrderedByName(sort: SortOrientation): YesVizDeviceInfo[] {
    return devices.sort((a, b) => {
      if (sort === "ASC") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  function getDevicesByName(
    name: string,
    filteredDevices?: YesVizDeviceInfo[]
  ) {
    let nextDevices = filteredDevices || devices;

    return nextDevices.filter((device) =>
      device.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  function getDeviceTypes(): DeviceTypes[] {
    return devices
      .reduce((acc, device) => {
        if (!acc.includes(device.type)) {
          acc.push(device.type);
        }
        return acc;
      }, [] as DeviceTypes[])
      .sort((a, b) => {
        return a.localeCompare(b);
      });
  }

  function getDevicesByType(
    type: DeviceTypes,
    filteredDevices?: YesVizDeviceInfo[]
  ) {
    let nextDevices = filteredDevices || devices;

    return nextDevices.filter((device) => device.type === type);
  }

  function sortByViewportWidth(orientation: SortOrientation) {
    // return devices sort by viewport width desc
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

    const devicesOrdered = sortByViewportWidth("ASC");

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

    const devicesOrdered = sortByViewportWidth("DESC");

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
    getDevicesOrderedByName,
    getDeviceTypes,
    getDevicesByName,
    getDevicesByType,
    getSmallestDevice,
    getLargestDevice,
  };
}
