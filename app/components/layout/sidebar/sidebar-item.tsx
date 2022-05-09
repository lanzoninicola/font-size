import { Center, Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "remix";
import SidebarItemLabel from "./sidebar-item-label";

export default function SidebarItem({
  to,
  label,
  ariaLabel,
  isSidebarActive,
  children,
}: {
  to: string;
  label: string;
  ariaLabel: string;
  isSidebarActive?: boolean;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }

  return (
    <Center
      position={"relative"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      w={isSidebarActive || isSidebarActive === undefined ? "60px" : "30px"}
      h={isSidebarActive || isSidebarActive === undefined ? "60px" : "40px"}
      transition="all 200ms ease-in-out"
    >
      <Link to={to}>
        <VStack
          spacing={1}
          zIndex={1}
          bg={isHovered ? "secondary.700" : "transparent"}
          w="65px"
          h="65px"
          borderRadius={"10px"}
          justify="center"
          transition="all 200ms ease-in-out"
        >
          {children}
          <SidebarItemLabel
            aria-label={ariaLabel}
            opacity={isSidebarActive || isSidebarActive === undefined ? 1 : 0}
            transition="all 200ms ease-in-out"
          >
            {label}
          </SidebarItemLabel>
        </VStack>
      </Link>
    </Center>
  );
}
