import { Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link } from "remix";
import VStackBox from "~/components/shared/vstack-wrapper";

export default function MissingBreakpointPage() {
  return (
    <Center>
      <VStackBox gap="2rem">
        <VStackBox>
          <Heading fontSize="lg" color="white" lineHeight={1.1}>
            No breakpoints created yet.
          </Heading>
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
