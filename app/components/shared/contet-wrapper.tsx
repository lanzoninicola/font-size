import { Flex, Grid } from "@chakra-ui/react";

export default function ContentWrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Flex direction="row" wrap="wrap" paddingInline={["1rem", "2rem", "4rem"]}>
      {children}
    </Flex>
  );
}
