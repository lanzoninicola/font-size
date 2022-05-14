import { useEffect } from "react";
import useMediaQueriesStylesheet from "~/domain/stylesheet/useMediaQueriesStylesheet";

import CodeBox from "./code-box";

export default function CodeRenderStandardCSS() {
  const { getMediaQueriesStylesheet, getStyleSheet } =
    useMediaQueriesStylesheet();

  return (
    <>
      <CodeBox disableCopy={true}>{}</CodeBox>
    </>
  );
}
