import { Box } from "@chakra-ui/react";
import SectionHeader from "./section-header";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      paddingLeft="1rem"
      borderBottom={"1px solid"}
      borderBottomColor="primaryAlpha.20"
      w="100%"
      className="page-title"
    >
      <SectionHeader>{children}</SectionHeader>
    </Box>
  );
}
