import { HStack } from "@chakra-ui/react";
import VStackBox from "./vstack-wrapper";

export default function InputWrapper({
  orientation,
  children,
  ...props
}: {
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <>
      {(orientation === "horizontal" || orientation === undefined) && (
        <HStack {...props}>{children}</HStack>
      )}
      {orientation === "vertical" && (
        <VStackBox {...props}>{children}</VStackBox>
      )}
    </>
  );
}
