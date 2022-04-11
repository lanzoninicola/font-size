import { useEffect } from "react";
import useClampFormula from "~/context/font-size/hooks/useClampFormula";
import useMaxFontSize from "~/context/font-size/hooks/useMaxFontSize";
import useMaxViewportWidth from "~/context/font-size/hooks/useMaxViewportWidth";
import useMinFontSize from "~/context/font-size/hooks/useMinFontSize";
import useMinViewportWidth from "~/context/font-size/hooks/useMinViewportWidth";
import useTag from "~/context/font-size/hooks/useTag";
import { Tags } from "~/context/interfaces";

import SectionHeader from "../shared/section-header";
import VStackBox from "../shared/vstack-wrapper";
import FormControlInputNumber from "./components/form-control-input-number";
import FormControlSelectTag from "./components/form-control-select-tag";

export default function StyleSection() {
  const { tag, setTag } = useTag();
  const { minViewportWidth, setMinViewportWidth } = useMinViewportWidth();
  const { maxViewportWidth, setMaxViewportWidth } = useMaxViewportWidth();
  const { minFontSize, setMinFontSize } = useMinFontSize();
  const { maxFontSize, setMaxFontSize } = useMaxFontSize();
  const formula = useClampFormula({ tag });

  function onChangeTag(tag: string) {
    setTag(tag as Tags);
  }

  function onChangeMinViewportWidth(value: string) {
    setMinViewportWidth(tag, value);
  }

  function onChangeMaxViewportWidth(value: string) {
    setMaxViewportWidth(tag, value);
  }

  function onChangeMinFontSize(value: string) {
    setMinFontSize(tag, value);
  }

  function onChangeMaxFontSize(value: string) {
    setMaxFontSize(tag, value);
  }

  useEffect(() => {
    setMinViewportWidth(tag, String(minViewportWidth[tag]));
    setMaxViewportWidth(tag, String(maxViewportWidth[tag]));
    setMinFontSize(tag, String(minFontSize[tag]));
    setMaxFontSize(tag, String(maxFontSize[tag]));
  }, [tag]);

  return (
    <VStackBox gap="1rem" w="100%">
      <SectionHeader>Style</SectionHeader>
      <VStackBox gap="1.2rem">
        <FormControlSelectTag onChange={(e) => onChangeTag(e.target.value)} />
        <FormControlInputNumber
          id="minViewportWidth"
          label="Minimum viewport width"
          value={minViewportWidth[tag]}
          unit="px"
          onChange={(e) => onChangeMinViewportWidth(e.target.value)}
        />
        <FormControlInputNumber
          id="maxViewportWidth"
          label="Maximum viewport width"
          value={maxViewportWidth[tag]}
          unit="px"
          onChange={(e) => onChangeMaxViewportWidth(e.target.value)}
        />
        <FormControlInputNumber
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
        />
      </VStackBox>
      <p style={{ color: "white" }}>formula: {formula}</p>
    </VStackBox>
  );
}
