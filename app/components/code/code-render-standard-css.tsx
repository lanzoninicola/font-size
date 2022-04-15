import { useEffect } from "react";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";

import CodeBox from "./code-box";

export default function CodeRenderStandardCSS() {
  const { codeBlock } = useCSSCodeBlock();

  return (
    <>
      <CodeBox disableCopy={true}>{codeBlock}</CodeBox>
    </>
  );
}
