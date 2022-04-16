import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import usePostMessageService from "~/domain/preview/usePostMessageService";

export default function PreviewContent() {
  const { handleMessages } = usePostMessageService();

  useEffect(() => {
    handleMessages();
  }, []);

  return (
    <>
      <Box bg="white" paddingInline={"1rem"} paddingBlock={"1.5rem"}>
        <Heading as="h1">This is a heading</Heading>
        <Heading as="h2">This is a sub-heading</Heading>
        <Text>
          Est enim in veniam enim tempor. Sit aliqua voluptate mollit dolore
          deserunt est adipisicing reprehenderit elit id sit. Sunt sint
          incididunt magna magna quis velit proident ut esse nisi adipisicing.
          Veniam non qui mollit quis officia sunt cupidatat id occaecat occaecat
          labore ut. Voluptate elit veniam magna sit ea irure labore. Elit esse
          consectetur laboris do eu minim incididunt culpa occaecat labore minim
          mollit. Adipisicing non amet consequat minim exercitation ut
          exercitation. Tempor dolore nulla est deserunt aliqua velit incididunt
          aliqua duis nisi cillum qui.
        </Text>
      </Box>
    </>
  );
}
