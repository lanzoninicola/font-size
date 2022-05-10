import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import FormControlInputSelect from "~/components/shared/form-control-input-select";
import VStackBox from "~/components/shared/vstack-wrapper";
import useCurrentBreakpointIdSelector from "~/context/type-scale-calculator-form/hooks/useCurrentBreakpointIdSelector";
import useMaxConfigSelector from "~/context/type-scale-calculator-form/hooks/useMaxConfigSelector";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useTypeScaleCalculatorData from "~/domain/type-scale-calculator/useTypeScaleCalculatorData";
import parseDecimalNumber from "~/domain/utilities/parseDecimalNumber";

export default function GroupMinimum() {
  const { currentBreakpointId } = useCurrentBreakpointIdSelector();
  const { max, actions } = useMaxConfigSelector();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();
  const { getTypeScaleRatio } = useTypeScaleCalculatorData();

  function initValues() {
    actions.INIT_MAXIMUM_CONFIG.dispatch({
      ...max,
      breakpointId: currentBreakpointId,
    });
  }

  function viewportMaxSize() {
    const { maxWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return maxWidth;
  }

  function onChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    actions.CHANGE_FONT_SIZE.dispatch({
      ...max,
      breakpointId: currentBreakpointId,
      fontSizeREM: value,
    });
  }

  function onChangeScaleRatio(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseDecimalNumber(event.target.value);
    actions.CHANGE_SCALE_RATIO.dispatch({
      ...max,
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
        {`At ${viewportMaxSize()}px viewport width`}
      </Heading>
      <VStackBox gap=".5rem">
        <FormControlInputNumber
          size="sm"
          label="Font Size"
          value={max.fontSizeREM}
          leftUnit="REM"
          onChange={onChangeFontSize}
          w="70px"
          textAlign="right"
        />
        <FormControlInputSelect
          size={"sm"}
          orientation="horizontal"
          label="Scale Ratio"
          value={max.scaleRatio}
          textAlign="right"
          minW="200px"
          onChange={onChangeScaleRatio}
        >
          {getTypeScaleRatio().map((typeScale) => (
            <option key={typeScale.key} value={typeScale.ratio}>
              {`${typeScale.ratio} (${typeScale.name})`}
            </option>
          ))}
        </FormControlInputSelect>
      </VStackBox>
    </VStackBox>
  );
}
