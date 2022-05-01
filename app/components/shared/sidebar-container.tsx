import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function SidebarContainer({
  gridArea,
  isLeft,
  isRight,
  children,
  ...props
}: {
  gridArea: string;

  isLeft?: boolean;
  isRight?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Box
      as="aside"
      gridArea={gridArea}
      borderRight={isLeft ? "1px solid" : "unset"}
      borderLeft={isRight ? "1px solid" : "unset"}
      borderColor={"primaryAlpha.20"}
      paddingInline=".5rem"
      minW="50px"
      {...props}
    >
      {children}
    </Box>
  );
}
