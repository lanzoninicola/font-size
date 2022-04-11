import { VStack } from "@chakra-ui/react";

export default function VStackBox({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <VStack align={["flex-start"]} spacing={0} w="100%" {...props}>
      {children}
    </VStack>
  );
}
