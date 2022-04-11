import { Button, Center, Flex, Grid, Heading } from "@chakra-ui/react";
import { Link, LoaderFunction, redirect } from "remix";
import VStackBox from "~/components/shared/vstack-wrapper";

export const loader: LoaderFunction = async () => {
  // TODO: loading the google fonts

  return null;
};

export default function Index() {
  return (
    <Flex w="100%" minH="100vh" justify="center" align={"center"}>
      <VStackBox m="auto" w="max-content" gap="1rem">
        <Heading
          as="h1"
          size={"4xl"}
          color="white"
          lineHeight={"1"}
          letterSpacing={-4}
        >
          Welcome to
          <br /> Font Scale
        </Heading>
        <Heading as="h2" size={"lg"} color="white" fontWeight={400}>
          This tool will help you choose <br />
          the right font size for your project
        </Heading>
        <Link to="/app">
          <Button>START</Button>
        </Link>
      </VStackBox>
    </Flex>
  );
}
