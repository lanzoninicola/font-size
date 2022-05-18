import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import useBreakpointsRoutes from "~/domain/breakpoints/useBreakpointsRoutes";
import useMediaQueriesRoutes from "~/domain/media-queries/useMediaQueriesRoutes";
import useTypeScaleRoutes from "~/domain/type-scale/useTypeScaleRoutes";

import {
  BreakpointsIcon,
  MediaQueryIcon,
  SelectorsIcon,
  SettingsIcon,
} from "../../shared/icons";
import SidebarContainer from "../../shared/sidebar-container";
import SidebarItem from "./sidebar-item";

interface SidebarItemConfig {
  to: string;
  label: string;
  ariaLabel: string;
  icon: React.ReactNode;
  isDisabled: boolean;
}

// TODO: Add a sidebar context and Service Hooks to add/disable sidebar items. Remove data from the view

export default function AppSidebar() {
  const { ROUTE_MEDIA_QUERY_BASE_ROUTE } = useMediaQueriesRoutes();
  const { ROUTE_BREAKPOINTS_BASE_ROUTE } = useBreakpointsRoutes();
  const { ROUTE_TYPE_SCALE_CALCULATOR } = useTypeScaleRoutes();

  const items: SidebarItemConfig[] = [
    {
      to: ROUTE_BREAKPOINTS_BASE_ROUTE,
      label: "Breakpoints",
      ariaLabel: "Define your custom breakpoints",
      icon: <BreakpointsIcon size={24} color="gray" />,
      isDisabled: false,
    },
    {
      to: ROUTE_TYPE_SCALE_CALCULATOR,
      label: "Type Scale Calculator",
      ariaLabel: "Define the selector to customize",
      icon: <SelectorsIcon size={24} color="gray" />,
      isDisabled: false,
    },
    {
      to: ROUTE_MEDIA_QUERY_BASE_ROUTE,
      label: "Media Queries",
      ariaLabel: "Define media queries and styles",
      icon: <MediaQueryIcon size={24} color="gray" />,
      isDisabled: false,
    },
    {
      to: "/app/settings",
      label: "Settings",
      ariaLabel: "Setting up your project",
      icon: <SettingsIcon size={24} color="gray" />,
      isDisabled: true,
    },
  ];

  return (
    <SidebarContainer gridArea="app-sidebar" isLeft={true}>
      <VStack position={"sticky"} top="calc(50px + 1rem)" spacing={4}>
        {items
          .filter((item) => !item.isDisabled)
          .map((item, idx) => (
            <SidebarItem key={idx} {...item}>
              {item.icon}
            </SidebarItem>
          ))}
      </VStack>
    </SidebarContainer>
  );
}
