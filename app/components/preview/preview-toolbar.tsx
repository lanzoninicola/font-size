import { HStack, Button, Input } from "@chakra-ui/react";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";

export default function PreviewToolbar() {
  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();
  const { setPreviewUrl } = usePreviewUrl();

  function onAddPreview() {
    const nextState = previewWindows + 1;

    setPreviewWindows(nextState);
  }

  function onChangeURL(e: React.ChangeEvent<HTMLInputElement>) {
    setPreviewUrl(`https://${e.target.value}`);
  }

  return (
    <HStack w="100%" paddingInline={"1rem"} gap="1rem">
      <Input
        type="text"
        variant={"filled"}
        h="40px"
        borderRadius="5px"
        placeholder="Visit a site: https://example.com"
        maxW="900px"
        _focus={{
          outline: "none",
          background: "primary.500",
        }}
        onChange={onChangeURL}
      />
      <Button onClick={onAddPreview}>Add Preview</Button>
    </HStack>
  );
}
