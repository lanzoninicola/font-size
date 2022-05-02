import { Box } from "@chakra-ui/react";
import ActionButton from "./action-button";
import { ExpandIcon } from "./icons";
import SectionSubHeader from "./section-subheader";
import VStackBox from "./vstack-wrapper";

export default function SidePanelCollapsed({
  title,
  toggleCollapse,
}: {
  title: string;
  toggleCollapse: () => void;
}) {
  return (
    <VStackBox w="100%" h="100%" pt="1rem" align="center">
      <ActionButton label="Collpase" onClick={toggleCollapse}>
        <ExpandIcon />
      </ActionButton>
      <Box w="100%" transform={"rotate(90deg) translateX(30px)"}>
        <SectionSubHeader
          transformOrigin="center"
          minW="max-content"
          lineHeight="1"
        >
          {title}
        </SectionSubHeader>
      </Box>
    </VStackBox>
  );
}
