import { Center, Tooltip } from "@chakra-ui/react";

export default function ActionButton({
  children,
  label,
  noHoverbg = false,
  isDisabled = false,
  tooltipOffset,
  ...props
}: {
  children: React.ReactNode;
  label: string;
  tooltipOffset?: [number, number];
  noHoverbg?: boolean;
  isDisabled?: boolean;
  [key: string]: any;
}) {
  const hoverProps = isDisabled
    ? undefined
    : {
        cursor: "pointer",
        bg: noHoverbg ? "transparent" : "secondary.700",
        transition: "all .2s ease-in-out",
      };

  return (
    <Center
      w="34px"
      h="34px"
      {...props}
      _hover={hoverProps}
      borderRadius={"5px"}
      onClick={isDisabled ? undefined : props.onClick}
      opacity={isDisabled ? 0.3 : 1}
    >
      <Tooltip
        label={label}
        aria-label={label}
        bg="secondary.500"
        color="background.500"
        gutter={16}
        offset={tooltipOffset || [-20, -60]}
        borderRadius={"5px"}
        fontSize=".85rem"
      >
        <span>{children}</span>
      </Tooltip>
    </Center>
  );
}
