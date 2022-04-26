import { HStack } from "@chakra-ui/react";

export default function EntityInnerList({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <HStack
      justify={"space-between"}
      w="100%"
      _hover={{
        cursor: "pointer",
        backgroundColor: "gray.100",
        borderRadius: "5px",
        paddingLeft: "1rem",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {children}
    </HStack>
  );
}
