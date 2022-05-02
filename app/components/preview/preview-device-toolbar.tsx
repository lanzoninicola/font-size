import { HStack, Text } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import parseInputString from "~/domain/utilities/parseInputString";
import FormControlInputNumber from "../shared/form-control-input-number";
import VStackBox from "../shared/vstack-wrapper";

export default function PreviewDeviceToolbar({ itemIdx }: { itemIdx: number }) {
  const { changeWindowWidth, changeWindowHeight } = usePreviewWindowsService();
  const { previewWindows } = usePreviewWindowsSelector();

  function onChangeWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    changeWindowWidth(itemIdx, value);
  }

  function onChangeHeight(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    changeWindowHeight(itemIdx, value);
  }

  const inputProps = {
    fontSize: "smaller",
    h: "20px",
    w: "60px",
    labelFontSize: "smaller",
    unitFontSize: "smaller",
  };

  console.log(previewWindows);

  return (
    <VStackBox spacing={2}>
      <HStack spacing={4} justify="center" maxW={"min-content"}>
        <FormControlInputNumber
          id={`viewport-width-${itemIdx}`}
          value={parseInputString(String(previewWindows[itemIdx].width))}
          label="W"
          ariaLabel="Set the width of the preview"
          unit="PX"
          onChange={(e) => onChangeWidth(e)}
          {...inputProps}
        />
        <FormControlInputNumber
          id={`viewport-height-${itemIdx}`}
          value={parseInputString(String(previewWindows[itemIdx].height))}
          label="H"
          ariaLabel="Set the height of the preview"
          unit="PX"
          onChange={(e) => onChangeHeight(e)}
          {...inputProps}
        />
      </HStack>
      <Text color="primary.500" fontSize="smaller">
        <Text as="span" fontSize="smaller" fontWeight={700}>
          Device:{" "}
        </Text>
        {previewWindows[itemIdx].deviceName}
      </Text>
    </VStackBox>
  );
}
