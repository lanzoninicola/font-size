import { HStack } from "@chakra-ui/react";

export default function ToolbarWrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <HStack
      w="100%"
      gap="1rem"
      spacing={0}
      borderRadius={"5px"}
      minW="50px"
      {...props}
    >
      {children}
    </HStack>
  );
}
