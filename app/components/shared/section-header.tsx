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
    <VStackBox mb="1.5rem">
      <Heading
        color="primary.500"
        as="h2"
        fontSize="28px"
        fontWeight={700}
        mb={".75rem"}
        {...props}
      >
        {children}
      </Heading>
      <Divider borderColor={"primaryAlpha.20"} />
    </VStackBox>
  );
}
