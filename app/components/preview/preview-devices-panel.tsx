import { HStack, Text, Tooltip } from "@chakra-ui/react";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import usePreviewDevicesSelector from "~/context/preview/hooks/usePreviewDevicesSelector";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import { DeviceTypes, YesVizDeviceInfo } from "~/context/preview/interfaces";
import usePreviewDevicesService from "~/domain/preview/usePreviewDevicesService";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";

import ActionButton from "../shared/action-button";
import {
  CloseIcon,
  LaptopIcon,
  MobileIcon,
  SortAlphabeticallyIcon,
  SortSizeIcon,
  TabletIcon,
  WatchIcon,
} from "../shared/icons";
import InputSelect from "../shared/input-select";
import InputText from "../shared/input-text";
import VStackBox from "../shared/vstack-wrapper";

export type DeviceTypeOptions = "All" | DeviceTypes;

export default function PreviewDevicesPanel({
  onShowDevicesPanel,
}: {
  onShowDevicesPanel: () => void;
}) {
  const { devices: providerDevices } = usePreviewDevicesSelector();
  const { actions } = usePreviewWindowsSelector();
  const { getNewPreviewDevice } = usePreviewWindowsService();
  const { getDevicesByName, getDevicesByType } = usePreviewDevicesService();
  const appScrollbarStyle = useCustomScrollbar();

  const [devices, setDevices] = useState<YesVizDeviceInfo[]>([]);
  const [selectedDeviceType, setSelectedDeviceType] =
    useState<DeviceTypeOptions>("All");
  const [deviceNameSearched, setDeviceNameSearched] = useState("");

  function filterDevices() {
    let devices = providerDevices;

    if (selectedDeviceType !== "All") {
      devices = getDevicesByType(selectedDeviceType);
    }

    if (deviceNameSearched) {
      devices = getDevicesByName(deviceNameSearched, devices);
    }

    setDevices(devices);
  }

  function onSelectedDeviceType(optionType: string) {
    setSelectedDeviceType(optionType as DeviceTypeOptions);
  }

  function onSelectedDevice(device: YesVizDeviceInfo) {
    const { viewportSize, name } = device;

    const previewDevice = getNewPreviewDevice(
      viewportSize.width,
      viewportSize.height,
      name
    );

    actions.PREVIEW_WINDOWS__ADD_WINDOW.dispatch(previewDevice);
  }

  function onSetDevices(devices: YesVizDeviceInfo[]) {
    setDevices(
      devices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  }

  function onSortAlphabeticallyASC() {
    const nextDevices = [...devices];

    setDevices(
      nextDevices.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  }

  function onSortByViewportWidthASC() {
    const nextDevices = [...devices];

    setDevices(
      nextDevices.sort((a, b) => {
        return a.viewportSize.width - b.viewportSize.width;
      })
    );
  }

  useEffect(() => {
    onSetDevices(providerDevices);
  }, [providerDevices]);

  useEffect(() => {
    filterDevices();
  }, [selectedDeviceType, deviceNameSearched]);

  return (
    <VStackBox
      minW="300px"
      gap=".75rem"
      p="1rem"
      bg="background.500"
      borderRadius="5px"
      position="absolute"
      left="-300px"
      top="2rem"
    >
      <VStackBox spacing={2}>
        <HStack w="100%" justify="space-between">
          <SelectDeviceType
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onSelectedDeviceType(e.target.value)
            }
          />
          <ActionButton label="Close" onClick={onShowDevicesPanel}>
            <CloseIcon />
          </ActionButton>
        </HStack>
        <HStack w="100%" justify="space-between">
          <SearchDevice
            value={deviceNameSearched}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setDeviceNameSearched(e.target.value)
            }
          />
          <HStack spacing={0}>
            <ActionButton label="Sort A-Z" onClick={onSortAlphabeticallyASC}>
              <SortAlphabeticallyIcon />
            </ActionButton>
            <ActionButton
              label="Sort by Width"
              onClick={onSortByViewportWidthASC}
            >
              <SortSizeIcon />
            </ActionButton>
          </HStack>
        </HStack>
        <Text
          fontSize="smaller"
          color={"primary.500"}
          lineHeight={1.1}
          fontStyle="italic"
        >
          Click on the device to add it to the preview
        </Text>
      </VStackBox>
      <VStackBox
        h="75vh"
        w="250px"
        overflow="auto"
        css={appScrollbarStyle}
        gap="1rem"
      >
        <DeviceList
          devices={devices}
          selectedDevice={(device: YesVizDeviceInfo) =>
            onSelectedDevice(device)
          }
        />
      </VStackBox>
    </VStackBox>
  );
}

function SelectDeviceType({ ...props }: { [key: string]: any }) {
  const { devices: providerDevices } = usePreviewDevicesSelector();
  const { getDeviceTypes } = usePreviewDevicesService();

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const deviceTypes = getDeviceTypes() as DeviceTypeOptions[];
    deviceTypes.unshift("All");

    setOptions(deviceTypes);
  }, [providerDevices]);

  return (
    <HStack>
      <Text color="primary.500" fontSize="smaller">
        Type
      </Text>
      <InputSelect w="100%" fontSize={"smaller"} textAlign="left" {...props}>
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </InputSelect>
    </HStack>
  );
}

function SearchDevice({ ...props }: { [key: string]: any }) {
  return (
    <HStack w="100%">
      <Text color="primary.500" fontSize="smaller">
        Search
      </Text>
      <InputText
        size="sm"
        w="100%"
        h="30px"
        borderRadius="5px"
        fontSize={"smaller"}
        {...props}
      />
    </HStack>
  );
}

function DeviceList({
  devices,
  selectedDevice,
  ...props
}: {
  devices: YesVizDeviceInfo[];
  selectedDevice: (device: any) => void;
  [key: string]: any;
}) {
  function getDeviceIcon(type: DeviceTypes) {
    switch (type) {
      case DeviceTypes.mobile:
        return <MobileIcon size={14} />;
      case DeviceTypes.tablet:
        return <TabletIcon size={14} />;
      case DeviceTypes.laptop:
        return <LaptopIcon size={14} />;
      case DeviceTypes.watch:
        return <WatchIcon size={14} />;
      default:
        return "";
    }
  }

  return (
    <VStackBox paddingInline=".5rem">
      {devices.map((device, index) => {
        return (
          <Tooltip
            key={index}
            label={`${device.name} (${device.viewportSize.width}x${device.viewportSize.height})`}
            aria-label={"fioo"}
            bg="secondary.700"
            color="background.500"
            gutter={16}
            placement="left-start"
            borderRadius={"5px"}
            fontSize=".85rem"
          >
            <HStack
              cursor="pointer"
              onClick={() => selectedDevice(device)}
              {...props}
            >
              {getDeviceIcon(device.type)}
              <Text
                fontSize={"smaller"}
                color="primary.500"
                _hover={{
                  color: "secondary.300",
                }}
              >
                {device.name}
              </Text>
            </HStack>
          </Tooltip>
        );
      })}
    </VStackBox>
  );
}
