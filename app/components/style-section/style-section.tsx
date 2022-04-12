import { useEffect } from "react";
import useBreakpointBuilder from "~/context/font-size/hooks/useBreakpointBuilder";
import useMediaQueriesBuilder from "~/context/font-size/hooks/useMediaQueriesBuilder";
import useTag from "~/context/font-size/hooks/useTag";
import { Tags } from "~/context/interfaces";

import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";
import Breakpoints from "./breakpoints";
import FormControlInputNumber from "./components/form-control-input-number";
import FormControlSelectTag from "./components/form-control-select-tag";

export default function StyleSection() {
  const { setTag } = useTag();

  const { onMinFontSizeChange, onMaxFontSizeChange } = useMediaQueriesBuilder();

  function onChangeTag(tag: string) {
    setTag(tag as Tags);
  }

  function onChangeMinViewportWidth(value: string) {}

  function onChangeMaxViewportWidth(value: string) {}

  function onChangeMinFontSize(value: string) {}

  function onChangeMaxFontSize(value: string) {}

  return (
    <VStackBox gap="1rem" w="100%">
      <SectionHeader>Style</SectionHeader>
      <VStackBox gap="1.2rem">
        <FormControlSelectTag onChange={(e) => onChangeTag(e.target.value)} />
        <Breakpoints />
        {/* <FormControlInputNumber
          id="minFontSize"
          label="Minimum font size"
          value={minFontSize[tag]}
          unit="rem"
          onChange={(e) => onChangeMinFontSize(e.target.value)}
        />
        <FormControlInputNumber
          id="maxFontSize"
          label="Maximum font size"
          value={maxFontSize[tag]}
          unit="rem"
          onChange={(e) => onChangeMaxFontSize(e.target.value)}
        /> */}
      </VStackBox>
      {/* <p style={{ color: "white" }}>formula: {formula}</p> */}
    </VStackBox>
  );
}
