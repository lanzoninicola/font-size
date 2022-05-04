import {
  Alert,
  AlertIcon,
  Center,
  Grid,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";
import { Selector } from "~/context/selectors-builder/interfaces";
import useSelectorsQueryService from "~/domain/selectors/useSelectorsQueryService";
import ActionButton from "../shared/action-button";
import { ArrowDownIcon, ArrowUpIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";

export default function SelectorsList() {
  const { htmlSelectors, setHtmlSelectors } = useHtmlSelectorsSelector();
  const { getSelectorsSortByOrder } = useSelectorsQueryService();

  const [selectors, setSelectors] = useState<Selector[]>([]);

  useEffect(() => {
    setSelectors(getSelectorsSortByOrder("DESC"));

    console.log(selectors);
  }, [htmlSelectors]);

  return (
    <>
      <VStackBox gap="2rem">
        <Alert status="info">
          <AlertIcon />
          <Text fontSize={"smaller"} lineHeight={1.1}>
            The selector highlighted in green is the base of your type scale
          </Text>
        </Alert>

        <VStackBox h="100%" gap="1rem">
          {selectors.map((selector, index) => {
            return (
              <Grid
                gridTemplateColumns={"1fr 1fr"}
                borderRadius="5px"
                key={index}
                bg={selector.isBaseline ? "secondary.700" : "background.300"}
                w="100%"
                p=".75rem"
                minW="150px"
                gap=".25rem"
              >
                <Heading fontSize={"lg"} color="primary.500">
                  {selector.key}
                </Heading>
                <HStack>
                  <VStackBox spacing={0}>
                    <Text
                      fontSize={"smaller"}
                      color="primary.500"
                      lineHeight={1.1}
                    >
                      Name
                    </Text>
                    <Text fontSize={"sm"} color="primary.500">
                      {selector.value}
                    </Text>
                  </VStackBox>
                </HStack>
              </Grid>
            );
          })}
        </VStackBox>
      </VStackBox>
    </>
  );
}
