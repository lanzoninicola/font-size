import { Center, Grid, Heading, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "remix";
import ActionButton from "~/components/shared/action-button";
import { NewEntityIcon } from "~/components/shared/icons";
import VStackBox from "~/components/shared/vstack-wrapper";
import { Selector } from "~/context/app/interfaces";

export default function EditTypeScalePage() {
  const [selectors, setSelectors] = useState<Selector[]>([]);

  return (
    <Center minH="calc(100vh - 150px)" w="100%">
      <VStackBox gap="1.5rem" align="center">
        <ActionButton label="Add next to the baseline step">
          <NewEntityIcon />
        </ActionButton>
        <VStackBox>
          <Grid
            gridTemplateColumns={"1fr 1fr"}
            borderRadius="5px"
            bg="secondary.700"
            w="100%"
            p=".75rem"
            minW="150px"
            gap=".25rem"
          >
            <Heading fontSize={"lg"} color="primary.500">
              key
            </Heading>
            <HStack>
              <VStackBox spacing={0}>
                <Text fontSize={"smaller"} color="primary.500" lineHeight={1.1}>
                  Name
                </Text>
                <Text fontSize={"sm"} color="primary.500">
                  name
                </Text>
              </VStackBox>
              <VStackBox spacing={0}>
                <Text fontSize={"smaller"} color="primary.500" lineHeight={1.1}>
                  Type
                </Text>
                <Text fontSize={"sm"} color="primary.500">
                  type
                </Text>
              </VStackBox>
            </HStack>
          </Grid>
        </VStackBox>
        <ActionButton label="Add prev to the baseline step">
          <NewEntityIcon />
        </ActionButton>
      </VStackBox>
    </Center>
  );
}
