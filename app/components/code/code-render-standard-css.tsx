import { Box, Code } from "@chakra-ui/react";
import useClampFormula from "~/context/font-size/hooks/useClampFormula";
import useMaxViewportWidth from "~/context/font-size/hooks/useMaxViewportWidth";
import useMinViewportWidth from "~/context/font-size/hooks/useMinViewportWidth";
import usePixelsPerRem from "~/context/font-size/hooks/usePixelsPerRem";
import useTag from "~/context/font-size/hooks/useTag";
import CopyButton from "../shared/copy-button";
import CodeArea from "./code-area";

export default function CodeRenderStandardCSS() {
  const { tag } = useTag();
  const { pixelsPerRem } = usePixelsPerRem();
  const formula = useClampFormula({ tag });
  const { minViewportWidth } = useMinViewportWidth();
  const { maxViewportWidth } = useMaxViewportWidth();

  const codeBlock = `
html {font-size: ${(100 / 16) * pixelsPerRem}%;} /*${pixelsPerRem}px*/

@media only screen and (min-width: ${
    minViewportWidth[tag]
  }px) and (max-width: ${maxViewportWidth[tag]}px) {
    ${tag} {
        font-size: ${formula};
    }
}
`;

  return (
    <>
      <CodeArea disableCopy={true}>{codeBlock}</CodeArea>
    </>
  );
}

/**
 * BASE REFERENCE
 * 
 * 
@import url('https://fonts.googleapis.com/css?family=Poppins:400');

html {font-size: 100%;} 

body {
  background: white;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.75;
  color: #000000;
}

p {
    margin-bottom: 1rem;
}

h1, h2, h3, h4, h5 {
  margin: 3rem 0 1.38rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  margin-top: 0;
  font-size: 3.052rem;
}

h2 {font-size: 2.441rem;}

h3 {font-size: 1.953rem;}

h4 {font-size: 1.563rem;}

h5 {font-size: 1.25rem;}

small, .text_small {font-size: 0.8rem;}
 */
