import { Box } from "@chakra-ui/react";

/**
 * @description: This puts the scrollbar at the top of the container
 * Children must have the prop transform to rotateX(180deg) too
 */

export default function FlippedContainer({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Box
      w="100%"
      transform={"rotateX(180deg)"}
      overflow="scroll"
      css={{
        "&::-webkit-scrollbar": {
          width: "0.8em",
          height: "0.8em",
        },

        "&::-webkit-scrollbar-track": {
          borderRadius: "20px",
          backgroundColor: "#2F303C",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#159898",
          borderRadius: "20px",
          "&: hover": {
            backgroundColor: "#AEF4F4",
            transition: "all 0.2s ease-in-out",
          },
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
