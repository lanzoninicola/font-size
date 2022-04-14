import { useEffect } from "react";
import { MediaQueries } from "~/context/font-size/interfaces";
import useCSSCodeBlock from "~/domain/code-block/useCSSCodeBlock";

import CodeArea from "./code-area";

export default function CodeRenderStandardCSS({
  mediaQueries,
}: {
  mediaQueries: MediaQueries | null;
}) {
  const { codeBlock } = useCSSCodeBlock({ mediaQueries });

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
