import { Button, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";

export default function PreviewToolbar() {
  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();

  function onAddPreview() {
    const nextState = previewWindows + 1;

    setPreviewWindows(nextState);
  }

  return (
    <HStack w="100%" paddingInline={"1rem"} gap="1rem">
      <Button onClick={onAddPreview}>Add Preview</Button>
    </HStack>
  );
}
