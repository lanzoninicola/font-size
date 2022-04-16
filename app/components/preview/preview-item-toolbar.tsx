import { HStack } from "@chakra-ui/react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewService from "~/domain/preview/usePreviewService";
import parseInputString from "~/domain/utilities/parseInputString";
import FormControlInputNumber from "../shared/form-control-input-number";

export default function PreviewItemToolbar({ itemIdx }: { itemIdx: number }) {
  const { changeWindowWidth, changeWindowHeight } = usePreviewService();
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
    <HStack spacing={0} justify="center" maxW={"min-content"}>
      <FormControlInputNumber
        id={`viewport-width-${itemIdx}`}
        value={parseInputString(String(previewWindows[itemIdx].width))}
        fontSize="16px"
        h="30px"
        w="80px"
        label="W"
        labelFontSize="16px"
        ariaLabel="Set the width of the preview"
        unit="PX"
        unitFontSize="12px"
        onChange={(e) => onChangeWidth(e)}
      />
      <FormControlInputNumber
        id={`viewport-height-${itemIdx}`}
        value={parseInputString(String(previewWindows[itemIdx].height))}
        fontSize="16px"
        h="30px"
        w="80px"
        label="H"
        labelFontSize="16px"
        ariaLabel="Set the height of the preview"
        unit="PX"
        unitFontSize="12px"
        onChange={(e) => onChangeHeight(e)}
      />
    </HStack>
  );
}
