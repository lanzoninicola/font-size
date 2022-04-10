import { VStack } from "@chakra-ui/react";
import { FontIcon, SettingsIcon, StyleIcon } from "../shared/icons";

export default function Sidebar() {
  return (
    <VStack
      borderLeft={"1px solid"}
      borderRight={"1px solid"}
      borderColor={"primaryAlpha.20"}
      gridArea={"sd"}
      minW="100px"
    >
      <StyleIcon color="white" />
      <FontIcon color="white" />
      <SettingsIcon color="white" />
    </VStack>
  );
}
