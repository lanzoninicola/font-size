import { Button, Center, Text } from "@chakra-ui/react";
import { Link } from "remix";
import VStackBox from "./vstack-wrapper";

export default function BreakpointsMissingMessage() {
  return (
    <Center>
      <VStackBox gap="2rem">
        <VStackBox>
          <Text fontSize="28px" color="white">
            No breakpoints created yet.
          </Text>
          <Text color="white">
            Please create some breakpoints and come back here.
          </Text>
        </VStackBox>
        <Link to={`/app/breakpoints`}>
          <Button>Go to Breakpoints</Button>
        </Link>
      </VStackBox>
    </Center>
  );
}
