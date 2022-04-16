import { Center, Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "remix";
import SidebarItemLabel from "./sidebar-item-label";

export default function SidebarItem({
  to,
  label,
  ariaLabel,
  children,
}: {
  to: string;
  label: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const [backdropOpacity, setBackdropOpacity] = useState(0);
  const [scale, setScale] = useState(0);

  function onMouseEnter() {
    setBackdropOpacity(0.5);
    setScale(1);
  }

  function onMouseLeave() {
    setBackdropOpacity(0);
    setScale(0);
  }

  return (
    <Center
      position={"relative"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      w="60px"
      h="60px"
    >
      <Box
        borderRadius="50%"
        transition={"all .2s ease-in-out"}
        bg="secondary.300"
        opacity={backdropOpacity}
        w="50px"
        h="50px"
        position="absolute"
        top={"50%"}
        left={"50%"}
        zIndex={-1}
        transform={`scale(${scale}) translate(-50%, -50%)`}
      ></Box>
      <Link to={to}>
        <VStack spacing={1} zIndex={1}>
          {children}
          <SidebarItemLabel aria-label={ariaLabel}>{label}</SidebarItemLabel>
        </VStack>
      </Link>
    </Center>
  );
}
