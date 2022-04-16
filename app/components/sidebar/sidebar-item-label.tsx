import { Text } from "@chakra-ui/react";

export default function SidebarItemLabel({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Text
      fontSize="10px"
      color="primary.500"
      textAlign={"center"}
      lineHeight="1.1"
      {...props}
    >
      {children}
    </Text>
  );
}
