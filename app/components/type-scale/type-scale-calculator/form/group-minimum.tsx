import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputSelect from "~/components/shared/form-control-input-select";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleRatio from "~/domain/type-scale-calculator/useTypeScaleRatio";

import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

export default function GroupMinimum() {
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();

  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const ratio = useTypeScaleRatio();

  function initValues() {
    actions.INIT_MINIMUM_CONFIG.dispatch({
      ...min,
      breakpointId: currentBreakpointId,
    });
  }

  function viewportMinSize() {
    const { minWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return minWidth;
  }

  function onChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    actions.CHANGE_FONT_SIZE.dispatch({
      ...min,
      breakpointId: currentBreakpointId,
      fontSizeREM: value,
    });
  }

  function onChangeScaleRatio(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseDecimalNumber(event.target.value);
    actions.CHANGE_SCALE_RATIO.dispatch({
      ...min,
      breakpointId: currentBreakpointId,
      scaleRatio: value,
    });
  }

  useEffect(() => {
    initValues();
  }, [currentBreakpointId]);

  return (
    <VStackBox spacing={2}>
      <Heading as="h3" fontSize={"xs"} color="secondary.300">
        {`At ${viewportMinSize()}px viewport width`}
      </Heading>
      <VStackBox gap=".5rem">
        <FormControlInputNumber
          size="sm"
          label="Font Size"
          value={min.fontSizeREM}
          leftUnit="REM"
          onChange={onChangeFontSize}
          w="70px"
          textAlign="right"
        />
        <FormControlInputSelect
          size={"sm"}
          orientation="horizontal"
          label="Scale Ratio"
          value={min.scaleRatio}
          textAlign="right"
          minW="200px"
          onChange={onChangeScaleRatio}
        >
          {ratio.map((typeScale, idx) => (
            <option key={idx} value={typeScale.ratio}>
              {`${typeScale.ratio} (${typeScale.name})`}
            </option>
          ))}
        </FormControlInputSelect>
      </VStackBox>
    </VStackBox>
  );
}
