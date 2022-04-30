import { HStack } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";
import parseInputString from "~/domain/utilities/parseInputString";
import FormControlInputNumber from "../shared/form-control-input-number";

export default function PreviewItemToolbar({ itemIdx }: { itemIdx: number }) {
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

  return (
    <HStack spacing={4} justify="center" maxW={"min-content"}>
      <FormControlInputNumber
        id={`viewport-width-${itemIdx}`}
        value={parseInputString(String(previewWindows[itemIdx].width))}
        fontSize="12px"
        h="20px"
        w="60px"
        label="W"
        labelFontSize="12px"
        ariaLabel="Set the width of the preview"
        unit="PX"
        unitFontSize="12px"
        onChange={(e) => onChangeWidth(e)}
      />
      <FormControlInputNumber
        id={`viewport-height-${itemIdx}`}
        value={parseInputString(String(previewWindows[itemIdx].height))}
        fontSize="12px"
        h="20px"
        w="60px"
        label="H"
        labelFontSize="12px"
        ariaLabel="Set the height of the preview"
        unit="PX"
        unitFontSize="12px"
        onChange={(e) => onChangeHeight(e)}
      />
    </HStack>
  );
}
