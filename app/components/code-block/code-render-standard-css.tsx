import { useEffect } from "react";
import useStylesheet from "~/domain/stylesheet/useStylesheet";

import CodeBox from "./code-box";

export default function CodeRenderStandardCSS() {
  const { getMediaQueriesStylesheet, getTypographyStyleSheet } =
    useStylesheet();

  return (
    <>
      <CodeBox disableCopy={true}>{}</CodeBox>
    </>
  );
}
