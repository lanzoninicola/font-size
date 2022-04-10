import { Box } from "@chakra-ui/react";

export default function BoxWrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Box bg={["primary.500"]} border="none" borderRadius={"20px"} {...props}>
      {children}
    </Box>
  );
}
