import { VStack } from "@chakra-ui/react";
import { Link } from "remix";
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
      <Link to="/styling">
        <StyleIcon color="white" />
      </Link>
      <FontIcon color="white" />
      <Link to="/settings">
        <SettingsIcon color="white" />
      </Link>
    </VStack>
  );
}
