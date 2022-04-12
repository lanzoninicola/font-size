import { Box, HStack, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLoaderData } from "remix";
import useClampFormulaByTag from "~/domain/clamp/hooks/useClampFormulaByTag";
import { Tags } from "~/context/interfaces";
import { LoaderData } from "~/routes/app/styling";

import FormControlInputNumber from "../shared/form-control-input-number";
import useClampFormula from "~/domain/clamp/hooks/useClampFormula";

export default function PreviewItem() {
  const loaderData: LoaderData = useLoaderData();

  const { minWidth, maxWidth, slope, yAxisIntersection } = useClampFormula();

  console.log("PreviewItem", minWidth);

  //   const fontSizes = {
  //     h1: {
  //       maxFS: h1.maxFontSize,
  //       minFS: h1.minFontSize,
  //       slope: h1.slope,
  //       axint: h1.yAxisIntersection,
  //     },
  //     h2: {
  //       maxFS: h2.maxFontSize,
  //       minFS: h2.minFontSize,
  //       slope: h2.slope,
  //       axint: h2.yAxisIntersection,
  //     },
  //     h3: {
  //       maxFS: h3.maxFontSize,
  //       minFS: h3.minFontSize,
  //       slope: h3.slope,
  //       axint: h3.yAxisIntersection,
  //     },
  //     h4: {
  //       maxFS: h4.maxFontSize,
  //       minFS: h4.minFontSize,
  //       slope: h4.slope,
  //       axint: h4.yAxisIntersection,
  //     },
  //     h5: {
  //       maxFS: h5.maxFontSize,
  //       minFS: h5.minFontSize,
  //       slope: h5.slope,
  //       axint: h5.yAxisIntersection,
  //     },
  //     h6: {
  //       maxFS: h6.maxFontSize,
  //       minFS: h6.minFontSize,
  //       slope: h6.slope,
  //       axint: h6.yAxisIntersection,
  //     },
  //   };

  useEffect(() => {
    if (document && window) {
      const body = document.querySelector("body");
      const script = document.createElement("script");
      script.textContent = `
        console.log('inside the framer');
        window.addEventListener(
          "message",
          (event) => {
            if (event.origin !== "${loaderData.ENV.IFRAME_ORIGIN}") return;
            //  console.log('message', event.source);
          },
          false
        );
        `;
      if (body) {
        body.appendChild(script);
      }
    }
  }, []);

  return (
    <VStack gap="1rem">
      <HStack>
        <FormControlInputNumber
          id="viewport-width"
          value={412}
          unit="PX"
          onChange={(e) => console.log(e.target.value)}
        />
        <FormControlInputNumber
          id="viewport-height"
          value={718}
          unit="PX"
          onChange={(e) => console.log(e.target.value)}
        />
      </HStack>

      <Box
        className="preview"
        width="412px"
        height="718px"
        borderRadius={"5px"}
      >
        <iframe src={`/preview/content`} width="100%" height="100%"></iframe>
      </Box>
    </VStack>
  );
}
