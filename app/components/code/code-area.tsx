import { Code } from "@chakra-ui/react";
import { useState } from "react";
import CopyButton from "../shared/copy-button";

export default function CodeArea({
  children,
  textToCopy,
  disableCopy,
  ...props
}: {
  children: React.ReactNode;
  textToCopy?: string;
  disableCopy?: boolean;
  [key: string]: any;
}) {
  return (
    <>
      <Code
        display="block"
        whiteSpace="pre"
        p="1rem"
        w="100%"
        position="relative"
        {...props}
      >
        {children}
        {!disableCopy && (
          <CopyButton
            textToCopy={textToCopy ? textToCopy : null}
            position="absolute"
            top={"1rem"}
            right="1rem"
          />
        )}
      </Code>
    </>
  );
}
