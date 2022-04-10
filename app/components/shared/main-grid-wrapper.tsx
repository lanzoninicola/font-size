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
      gridTemplateColumns={"auto 1fr 1fr"}
      gridAutoRows={"minmax(100px, auto)"}
      gridTemplateAreas='"sd hd   hd"
      "sd main main"
      "sd ft   ft"'
      {...props}
    >
      {children}
    </Grid>
  );
}

/**
 * .wrapper {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-auto-rows: minmax(100px, auto);
    grid-template-areas:
      "sd hd   hd"
      "sd main main"
      "sd ft   ft  ";
}
 */
