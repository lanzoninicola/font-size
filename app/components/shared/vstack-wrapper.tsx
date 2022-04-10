import { VStack } from "@chakra-ui/react";

export default function VStackBox({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <VStack align={["flex-start"]} {...props} spacing={0}>
      {children}
    </VStack>
  );
}
