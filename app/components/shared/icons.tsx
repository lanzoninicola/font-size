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
  size = 20,
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

export function NewEntityIcon({
  size = 20,
  color = "gray",
  ariaLabel = "New media query",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/new-entity-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function CodeIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Show me the code",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/code-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ExportConfig({
  size = 20,
  color = "gray",
  ariaLabel = "Export media queries",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/export-config-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MaxFontSizeIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Max font size",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/max-font-size-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MinFontSizeIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Max font size",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/min-font-size-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function LineHeightIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Max font size",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/line-height-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function EditIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Edit",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/edit-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MaxWidthIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Edit",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/max-width-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MinWidthIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Edit",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/min-width-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}
export function NavigateBackIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Navigate Back",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/arrow-circle-left-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function NavigateForwardIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Navigate Forward",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/arrow-circle-right-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ResetIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Reset",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/reset-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SaveIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Save",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/save-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function CollapseIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Collapse Item",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/collapse-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ExpandIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Expan Item",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/expand-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ClearAllIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Remove All Items",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/clear-all-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SearchIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Search Items",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/search-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function MobileIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Mobile Device",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/mobile-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function TabletIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Tablet Device",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/tablet-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function LaptopIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Tablet Device",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/laptop-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function WatchIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Watch Device",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/watch-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SortAlphabeticallyIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Sort Alphabetically Ascending",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/sort-alphabetically-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function SortSizeIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Sort By Size Ascending",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/sort-sizing-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function InitIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Initialize data",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/init-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ArrowUpIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Move Up",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/arrow-up-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ArrowDownIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Move Down",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/arrow-down-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}

export function ExitIcon({
  size = 20,
  color = "gray",
  ariaLabel = "Move Down",
}: IconProps) {
  return (
    <Image
      src={`${BASE_URL}/exit-icon-${size}-${color}.svg`}
      alt={ariaLabel}
      altaria-label={ariaLabel}
    />
  );
}
