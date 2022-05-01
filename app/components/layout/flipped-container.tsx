import { Box } from "@chakra-ui/react";
import useCustomScrollbar from "~/domain/utilities/useCustomScrollbar";

/**
 * @description: This puts the scrollbar at the top of the container
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
      position="relative"
      {...props}
    >
      <Box w="100%" transform={`rotateX(180deg)`}>
        {children}
      </Box>
    </Box>
  );
}
