import { Box } from "@chakra-ui/react";

export default function SidePanel({
  minW,
  maxW,
  isCollapsed,
  children,
  ...props
}: {
  minW: string;
  maxW: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Box
      className="leftside-panel"
      w={isCollapsed ? minW : maxW}
      borderRight="1px solid"
      borderRightColor={"primaryAlpha.20"}
      minH="100vh"
      transition="max-width 0.2s ease-in-out"
      bg="background.300"
      {...props}
    >
      {children}
    </Box>
  );
}
