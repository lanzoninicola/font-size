import { Image } from "@chakra-ui/react";

interface IconProps {
  size?: number;
  color?: string;
  ariaLabel?: string;
}

const BASE_URL = "/images/icons";

export function LinkOutIcon({
  size = 40,
  color = "black",
  ariaLabel = "Open link in new tab",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/link-out-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function FontsIcon({
  size = 40,
  color = "black",
  ariaLabel = "Setting up the font",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/fonts-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SettingsIcon({
  size = 40,
  color = "black",
  ariaLabel = "Open settings",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/settings-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MediaQueryIcon({
  size = 40,
  color = "black",
  ariaLabel = "Media Query Builder",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/mediaquery-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function WIcon({ size = 36, color = "gray" }: IconProps) {
  return <Image src={`${BASE_URL}/w-icon-${size}-${color}.svg`} />;
}

export function HIcon({ size = 36, color = "gray" }: IconProps) {
  return <Image src={`${BASE_URL}/h-icon-${size}-${color}.svg`} />;
}

export function AddIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Add",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/add-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function TrashIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Remove",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/trash-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function BrowserIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Show the browser bar",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/browser-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function CloseIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Close",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/close-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ZoomInIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Zoom In",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/zoomin-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ZoomOutIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Zoom Out",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/zoomout-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function BreakpointsIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Settings up the breakpoints",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/breakpoints-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SelectorsIcon({
  size = 24,
  color = "gray",
  ariaLabel = "Setting up your selectors",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/selectors-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}
