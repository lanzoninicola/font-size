import { ResponsiveValue, Text, TextProps } from "@chakra-ui/react";
import React from "react";

export default function TableTitle({
  children,
  gridArea,
  textAlign = "left",
}: {
  children: string;
  gridArea?: string;
  textAlign?: ResponsiveValue<CanvasTextAlign>;
}) {
  return (
    <Text
      color="secondary.500"
      fontSize="small"
      letterSpacing="widest"
      textTransform="uppercase"
      textAlign={textAlign}
      gridArea={gridArea}
    >
      {children}
    </Text>
  );
}
