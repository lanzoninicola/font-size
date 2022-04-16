import { Center, Tooltip } from "@chakra-ui/react";

export default function ToolbarButton({
  children,
  label,
  ...props
}: {
  children: React.ReactNode;
  label: string;
  [key: string]: any;
}) {
  return (
    <Center
      w="34px"
      h="34px"
      {...props}
      _hover={{
        cursor: "pointer",
        bg: "secondary.700",
        transition: "all .2s ease-in-out",
      }}
      borderRadius={"5px"}
    >
      <Tooltip
        label={label}
        aria-label={label}
        bg="secondary.700"
        color="background.500"
        gutter={16}
        offset={[-20, -60]}
        borderRadius={"5px"}
        fontSize=".85rem"
      >
        <span>{children}</span>
      </Tooltip>
    </Center>
  );
}
