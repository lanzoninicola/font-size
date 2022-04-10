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
