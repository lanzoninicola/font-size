import { Grid, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";
import parseInputString from "~/domain/utilities/parseInputString";

import FormControlInputNumber from "../shared/form-control-input-number";
import { TrashIcon } from "../shared/icons";
import VStackBox from "../shared/vstack-wrapper";
import IframeBox from "./iframe-box";
import ToolbarButton from "./toolbar-button";

// TODO: ADD SENDER_ID TO IFRAME

export default function PreviewItem({
  idx,
  width,
  height,
}: {
  idx: number;
  width: number;
  height: number;
}) {
  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();
  const [sizeWidth, setSizeWidth] = useState(width);
  const [sizeHeight, setSizeHeight] = useState(height);

  const [showRemoveIcon, setShowRemoveIcon] = useState(false);

  function onChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSizeWidth(parseDecimalNumber(value));

    const nextState = [...previewWindows];
    nextState[idx].width = parseDecimalNumber(value);
    setPreviewWindows(nextState);
  }

  function onChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSizeHeight(parseDecimalNumber(value));

    const nextState = [...previewWindows];
    nextState[idx].height = parseDecimalNumber(value);
    setPreviewWindows(nextState);
  }

  function onHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    setShowRemoveIcon(true);
  }

  function onRemovePreviewWindow(idx: number) {
    let nextState = [...previewWindows];

    nextState = nextState.filter(
      (item) => item.height !== sizeHeight || item.width !== sizeWidth
    );

    setPreviewWindows(nextState);
  }

  return (
    <Grid
      key={idx}
      gridTemplateRows={"auto 1fr"}
      gap="1rem"
      padding="1rem"
      _hover={{
        cursor: "pointer",
        backgroundColor: "secondary.700",
        borderRadius: "5px",
        transition: "all .2s ease-in-out",
      }}
      position="relative"
      onMouseEnter={onHover}
      onMouseLeave={() => setShowRemoveIcon(false)}
    >
      <HStack spacing={0} justify="center">
        <FormControlInputNumber
          id="viewport-width"
          value={parseInputString(String(sizeWidth))}
          label="W"
          labelFontSize="16px"
          ariaLabel="Set the width of the preview"
          fontSize="16px"
          unit="PX"
          unitFontSize="12px"
          h="30px"
          w="80px"
          onChange={(e) => onChangeWidth(e)}
        />
        <FormControlInputNumber
          id="viewport-height"
          value={parseInputString(String(sizeHeight))}
          label="H"
          labelFontSize="16px"
          ariaLabel="Set the height of the preview"
          fontSize="16px"
          unit="PX"
          unitFontSize="12px"
          h="30px"
          w="80px"
          onChange={(e) => onChangeHeight(e)}
        />
        <Text>{`Window ID ${idx}`}</Text>
      </HStack>

      <IframeBox
        width={parseDecimalNumber(String(sizeWidth))}
        height={parseDecimalNumber(String(sizeHeight))}
      />

      {showRemoveIcon && (
        <ToolbarButton
          label="Remove window"
          position="absolute"
          top={3}
          right={4}
          onClick={() => onRemovePreviewWindow(idx)}
        >
          <TrashIcon />
        </ToolbarButton>
      )}
    </Grid>
  );
}
