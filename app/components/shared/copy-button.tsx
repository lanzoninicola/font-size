import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// TODO: MAKE THIS WORK

export default function CopyButton({
  textToCopy,
  ...props
}: {
  textToCopy: string | null;
  [key: string]: any;
}) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard() {
    if ("clipboard" in navigator && textToCopy) {
      return await navigator.clipboard.writeText(textToCopy);
    }
  }

  async function handleCopyClick() {
    try {
      await copyTextToClipboard();
      setIsCopied(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let copiedTimeout: NodeJS.Timeout;

    if (isCopied) {
      copiedTimeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }

    return () => {
      clearTimeout(copiedTimeout);
    };
  }, [isCopied]);

  return (
    <Button
      colorScheme="teal"
      size="xs"
      onClick={handleCopyClick}
      letterSpacing="wide"
      {...props}
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  );
}
