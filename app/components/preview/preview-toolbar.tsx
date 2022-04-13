import {
  HStack,
  Button,
  Input,
  Text,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import usePreviewUrl from "~/context/preview/hooks/usePreviewUrl";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import validateURL from "~/domain/preview/validateURL";
import VStackBox from "../shared/vstack-wrapper";

export default function PreviewToolbar() {
  const { previewWindows, setPreviewWindows } = usePreviewWindowsSelector();
  const { previewUrl, setPreviewUrl } = usePreviewUrl();

  const [inputURL, setInputURL] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [urlInvalidMessage, setUrlInvalidMessage] = useState("");

  function onAddPreview() {
    const nextState = previewWindows + 1;

    setPreviewWindows(nextState);
  }

  // TODO: move to the server
  function parseURL(url: string) {
    let nextState = url;

    if (url.startsWith("https://") === false) {
      if (url.startsWith("http://") === true) {
        nextState = url;
      } else {
        nextState = `https://${nextState}`;
      }
    }

    if (url.endsWith("/")) {
      nextState = previewUrl.replace(/\/$/, "");
    }

    setPreviewUrl(nextState);
  }

  function onSendURL() {
    //   parseURL(inputURL);
    setPreviewUrl(inputURL);
  }

  function onChangeURL(e: React.ChangeEvent<HTMLInputElement>) {
    setInputURL(e.target.value);

    if (isInvalid && e.target.value === "") {
      setIsInvalid(false);
      setUrlInvalidMessage("");
    }
  }

  function onCloseAlertURLInvalid() {
    setInputURL("");
    setIsInvalid(false);
  }

  useEffect(() => {}, []);

  return (
    <HStack w="100%" paddingInline={"1rem"} gap="1rem">
      <VStackBox>
        <HStack w="100%">
          <Input
            type="text"
            variant={"filled"}
            h="40px"
            borderRadius="5px"
            placeholder="Visit a site: https://example.com"
            maxW="500px"
            isInvalid={isInvalid}
            _focus={{
              outline: "none",
              background: "primary.500",
            }}
            value={inputURL}
            onChange={onChangeURL}
          />
          <Button onClick={onSendURL}>GO</Button>
        </HStack>
        {isInvalid && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>URL is invalid!</AlertTitle>
            <AlertDescription>{urlInvalidMessage}</AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={onCloseAlertURLInvalid}
            />
          </Alert>
        )}
      </VStackBox>
      <Button onClick={onAddPreview}>Add Preview</Button>
    </HStack>
  );
}
