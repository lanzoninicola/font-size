import { Grid } from "@chakra-ui/react";
import React from "react";

export default function MainGridWrapper({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Grid
      gridTemplateColumns={"auto auto 1fr auto"}
      gridTemplateRows={"auto 1fr auto"}
      gridTemplateAreas='"header header header header"
      "app-sidebar panel main preview-sidebar"
      "footer footer footer footer"'
      {...props}
    >
      {children}
    </Grid>
  );
}
