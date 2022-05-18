import { Divider, Heading } from "@chakra-ui/react";
import VStackBox from "./vstack-wrapper";

export default function SectionHeader({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <VStackBox h="65px" justify="center">
      <Heading
        color="primary.500"
        as="h2"
        fontSize="22px"
        lineHeight="50px"
        fontWeight="bold"
        {...props}
      >
        {children}
      </Heading>
      {/* <Divider borderColor={"primaryAlpha.20"} /> */}
    </VStackBox>
  );
}
