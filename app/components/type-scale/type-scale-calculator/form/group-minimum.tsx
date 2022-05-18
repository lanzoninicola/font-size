import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputSelect from "~/components/shared/form-control-input-select";
import VStackBox from "~/components/shared/vstack-wrapper";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleRatio from "~/domain/type-scale/type-scale-calculator/useTypeScaleRatio";
import useTypeScaleQueryService from "~/domain/type-scale/useTypeScaleQueryService";

import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

export default function GroupMinimum() {
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { typeScaleConfig, actions } = useTypeScaleConfigSelector();
  const { actions: mediaQueryActions } = useMediaQueriesSelector();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const { getMinFontSize, getMinScaleRatio } =
    useTypeScaleQueryService(typeScaleConfig);
  const ratio = useTypeScaleRatio();

  function viewportMinSize() {
    const { minWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return minWidth;
  }

  function onChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const minFontSizeREM = parseDecimalNumber(event.target.value);

    actions.TYPESCALE_CONFIG__UPDATE_MIN_FONT_SIZE.dispatch({
      breakpointId: currentBreakpointId,
      minFontSizeREM,
    });
  }

  function onChangeScaleRatio(event: React.ChangeEvent<HTMLInputElement>) {
    const minScaleRatio = parseDecimalNumber(event.target.value);
    actions.TYPESCALE_CONFIG__UPDATE_MIN_SCALE_RATIO.dispatch({
      breakpointId: currentBreakpointId,
      minScaleRatio,
    });
  }

  return (
    <VStackBox spacing={2}>
      <Heading as="h3" fontSize={"xs"} color="secondary.300">
        {`At ${viewportMinSize()}px viewport width`}
      </Heading>
      <VStackBox gap=".5rem">
        <FormControlInputNumber
          size="sm"
          label="Font Size"
          value={String(getMinFontSize(currentBreakpointId))}
          leftUnit="REM"
          onChange={onChangeFontSize}
          w="70px"
          textAlign="right"
        />
        <FormControlInputSelect
          size={"sm"}
          orientation="horizontal"
          label="Scale Ratio"
          value={String(getMinScaleRatio(currentBreakpointId))}
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
