import {
  Alert,
  AlertIcon,
  Grid,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useHtmlSelectorsSelector from "~/context/app/hooks/useTypeScaleStepsSelector";
import { TypeScaleStepConfig } from "~/context/type-scale-steps-builder/interfaces";
import useTypeScaleStepsQueryService from "~/domain/type-scale-steps/useTypeScaleStepsQueryService";

import VStackBox from "../../shared/vstack-wrapper";

export default function TypeScaleStepsList() {
  const { typeScaleSteps, setTypeScaleSteps } = useHtmlSelectorsSelector();
  const { getStepsSortedByPosition } = useTypeScaleStepsQueryService();

  const [selectors, setSelectors] = useState<TypeScaleStepConfig[]>([]);

  useEffect(() => {
    setSelectors(getStepsSortedByPosition("DESC"));

    console.log(selectors);
  }, [typeScaleSteps]);

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
