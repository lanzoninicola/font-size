import { Button } from "@chakra-ui/react";
import { useState } from "react";
import VStackBox from "../shared/vstack-wrapper";
import CodeRenderOptions from "./code-render-options";
import CodeRenderStandardCSS from "./code-render-standard-css";

export default function CodeSection() {
  const [showCode, setShowCode] = useState<boolean>(false);

  function onCodeShow() {
    setShowCode(!showCode);
  }

  return (
    <VStackBox gap="1rem" w="100%">
      <Button onClick={() => onCodeShow()}>Show me the code</Button>
      {showCode && (
        <VStackBox align="flex-end" gap="1rem" w="100%">
          <CodeRenderOptions />
          <CodeRenderStandardCSS />
        </VStackBox>
      )}
    </VStackBox>
  );
}
