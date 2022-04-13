import { Grid, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import FormControlInputNumber from "../shared/form-control-input-number";
import VStackBox from "../shared/vstack-wrapper";
import IframeBox from "./iframe-box";

// TODO: ADD SENDER_ID TO IFRAME

export default function PreviewItem() {
  const [width, setWidth] = useState(412);
  const [height, setHeight] = useState(718);

  function onChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    setWidth(parseInt(e.target.value, 10));
  }

  function onChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
    setHeight(parseInt(e.target.value, 10));
  }

  return (
    <Grid gridTemplateRows={"auto 1fr"} gap="1.5rem">
      <HStack spacing={0}>
        <VStackBox w="100%" gap=".15rem">
          <Text fontSize={"12px"} color="white" textAlign={"center"}>
            width
          </Text>
          <FormControlInputNumber
            id="viewport-width"
            value={width}
            unit="PX"
            onChange={(e) => onChangeWidth(e)}
          />
        </VStackBox>
        <VStackBox w="100%" gap=".15rem">
          <Text fontSize={"12px"} color="white" textAlign={"center"}>
            height
          </Text>
          <FormControlInputNumber
            id="viewport-height"
            value={height}
            unit="PX"
            onChange={(e) => onChangeHeight(e)}
          />
        </VStackBox>
      </HStack>

      <IframeBox width={width} height={height} />
    </Grid>
  );
}
