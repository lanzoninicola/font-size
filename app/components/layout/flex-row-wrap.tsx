import { Flex } from "@chakra-ui/react";

export default function FlexRowWrap({
  children,
  spacing = "1rem",
  ...props
}: {
  children: React.ReactNode;
  spacing?: string;
  [key: string]: any;
}) {
  return (
    <Flex
      direction={"row"}
      // wrap="wrap"
      gap={spacing}
      {...props}
    >
      {children}
    </Flex>
  );
}
