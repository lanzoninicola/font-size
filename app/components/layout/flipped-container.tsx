import { Box } from "@chakra-ui/react";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";

/**
 * @description: This puts the scrollbar at the top of the container
 * Children must have the prop "transform" set to "rotateX(180deg)" too
 */

export default function FlippedContainer({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  const appScrollbarStyle = useCustomScrollbar();

  return (
    <Box
      w="100%"
      transform={"rotateX(180deg)"}
      overflow="auto"
      css={appScrollbarStyle}
      {...props}
    >
      {children}
    </Box>
  );
}
