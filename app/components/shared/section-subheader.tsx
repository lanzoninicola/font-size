import { Heading } from "@chakra-ui/react";
import VStackBox from "./vstack-wrapper";

export default function SectionSubHeader({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <VStackBox>
      <Heading
        color="primary.500"
        as="h2"
        fontSize="16px"
        lineHeight="50px"
        fontWeight={700}
        {...props}
      >
        {children}
      </Heading>
    </VStackBox>
  );
}
