import { Box, VStack } from "@chakra-ui/react";

import {
  BreakpointsIcon,
  MediaQueryIcon,
  SelectorsIcon,
  SettingsIcon,
} from "../shared/icons";
import SidebarItem from "./sidebar-item";

interface SidebarItem {
  to: string;
  label: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

export default function Sidebar() {
  const items: SidebarItem[] = [
    {
      to: "/app/breakpoints",
      label: "Breakpoints",
      ariaLabel: "Define your custom breakpoints",
      icon: <BreakpointsIcon size={24} color="gray" />,
    },
    {
      to: "/app/media-queries",
      label: "Media Queries",
      ariaLabel: "Define media queries and styles",
      icon: <MediaQueryIcon size={24} color="gray" />,
    },
    {
      to: "/app/selectors",
      label: "Selectors",
      ariaLabel: "Define the selector to customize",
      icon: <SelectorsIcon size={24} color="gray" />,
    },
    {
      to: "/app/settings",
      label: "Settings",
      ariaLabel: "Setting up your project",
      icon: <SettingsIcon size={24} color="gray" />,
    },
  ];

  return (
    <Box
      as="aside"
      gridArea={"sd"}
      borderRight={"1px solid"}
      borderColor={"primaryAlpha.20"}
      paddingInline=".5rem"
      minW="50px"
    >
      <VStack
        position={"sticky"}
        top="50%"
        transform="translateY(-50%)"
        spacing={4}
      >
        {items.map((item, idx) => (
          <SidebarItem key={idx} {...item}>
            {item.icon}
          </SidebarItem>
        ))}
      </VStack>
    </Box>
  );
}
