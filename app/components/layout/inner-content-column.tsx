import { Grid, GridOptions, HTMLChakraProps } from "@chakra-ui/react";

export interface InnerContentColumnProps
  extends Omit<HTMLChakraProps<"div">, keyof GridOptions>,
    GridOptions {}

export default function InnerContentColumn({
  children,
  ...props
}: InnerContentColumnProps) {
  return (
    <Grid w="100%" gap="1rem" gridTemplateRows={"auto 1fr"} {...props}>
      {children}
    </Grid>
  );
}
