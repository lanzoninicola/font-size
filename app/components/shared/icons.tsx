import { Image } from "@chakra-ui/react";

const BASE_URL = "/images/icons";

export function LinkOutIcon({
  size = 40,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/link-out-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function FontIcon({
  size = 40,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return <Image src={`${BASE_URL}/font-icon-${size}-${color}.svg`} alt="Pix" />;
}

export function SettingsIcon({
  size = 40,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/settings-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function StyleIcon({
  size = 40,
  color = "black",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/style-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function WIcon({
  size = 36,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return <Image src={`${BASE_URL}/w-icon-${size}-${color}.svg`} alt="Pix" />;
}

export function HIcon({
  size = 36,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return <Image src={`${BASE_URL}/h-icon-${size}-${color}.svg`} alt="Pix" />;
}

export function AddIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return <Image src={`${BASE_URL}/add-icon-${size}-${color}.svg`} alt="Pix" />;
}

export function TrashIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/trash-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function BrowserIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/browser-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function CloseIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/close-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function ZoomInIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/zoomin-icon-${size}-${color}.svg`} alt="Pix" />
  );
}

export function ZoomOutIcon({
  size = 24,
  color = "gray",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Image src={`${BASE_URL}/zoomout-icon-${size}-${color}.svg`} alt="Pix" />
  );
}
