import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputSelect from "~/components/shared/form-control-input-select";
import VStackBox from "~/components/shared/vstack-wrapper";
import useTypeScaleConfigSelector from "~/context/app/hooks/useTypeScaleConfigSelector";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";

import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleRatio from "~/domain/type-scale/type-scale-calculator/useTypeScaleRatio";
import useTypeScaleCalculatorData from "~/domain/type-scale/type-scale-calculator/useTypeScaleRatio";
import useTypeScaleQueryService from "~/domain/type-scale/useTypeScaleQueryService";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

export default function GroupMinimum() {
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { actions } = useTypeScaleConfigSelector();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const { typeScaleConfig } = useTypeScaleConfigSelector();
  const { getMaxFontSize, getMaxScaleRatio } =
    useTypeScaleQueryService(typeScaleConfig);
  const ratio = useTypeScaleRatio();

  function viewportMaxSize() {
    const { maxWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return maxWidth;
  }

  function onChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const maxFontSizeREM = parseDecimalNumber(event.target.value);
    actions.TYPESCALE_CONFIG__UPDATE_MAX_FONT_SIZE.dispatch({
      breakpointId: currentBreakpointId,
      maxFontSizeREM,
    });
  }

  function onChangeScaleRatio(event: React.ChangeEvent<HTMLInputElement>) {
    const maxScaleRatio = parseDecimalNumber(event.target.value);
    actions.TYPESCALE_CONFIG__UPDATE_MAX_SCALE_RATIO.dispatch({
      breakpointId: currentBreakpointId,
      maxScaleRatio,
    });
  }

  return (
    <VStackBox spacing={2}>
      <Heading as="h3" fontSize={"xs"} color="secondary.300">
        {`At ${viewportMaxSize()}px viewport width`}
      </Heading>
      <VStackBox gap=".5rem">
        <FormControlInputNumber
          size="sm"
          label="Font Size"
          value={String(getMaxFontSize(currentBreakpointId))}
          leftUnit="REM"
          onChange={onChangeFontSize}
          w="70px"
          textAlign="right"
        />
        <FormControlInputSelect
          size={"sm"}
          orientation="horizontal"
          label="Scale Ratio"
          value={getMaxScaleRatio(currentBreakpointId)}
          textAlign="right"
          minW="200px"
          onChange={onChangeScaleRatio}
        >
          {ratio.map((typeScale) => (
            <option key={typeScale.key} value={typeScale.ratio}>
              {`${typeScale.ratio} (${typeScale.name})`}
            </option>
          ))}
        </FormControlInputSelect>
      </VStackBox>
    </VStackBox>
  );
}
