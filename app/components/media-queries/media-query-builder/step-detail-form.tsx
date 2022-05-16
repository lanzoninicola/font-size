import FormControlInputNumber from "~/components/shared/form-control-input-number";
import VStackBox from "~/components/shared/vstack-wrapper";
import { StepId } from "~/context/type-scale-steps-builder/types";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";

export function StepDetailForm({ stepId }: { stepId: StepId }) {
  const {
    minFontSize,
    maxFontSize,
    lineHeight,
    marginBottom,
    changeMinFontSize,
    changeMaxFontSize,
    changeLineHeight,
    changeMarginBottom,
  } = useMediaQueriesBuilderService();

  const { currentBreakpointId } = useMediaQueriesBuilderService();
  const { getViewportSizeByBreakpointId } = useBreakpointsQueryService();

  function breakpointViewportMinSize() {
    const { minWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return minWidth;
  }

  function breakpointViewportMaxSize() {
    const { maxWidth } = getViewportSizeByBreakpointId(currentBreakpointId);
    return maxWidth;
  }

  function onChangeMinFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMinFontSize(e.target.value);
  }

  function onChangeMaxFontSize(e: React.ChangeEvent<HTMLInputElement>) {
    changeMaxFontSize(e.target.value);
  }

  function onChangeLineHeight(e: React.ChangeEvent<HTMLInputElement>) {
    changeLineHeight(e.target.value);
  }

  function onChangeMarginBottom(e: React.ChangeEvent<HTMLInputElement>) {
    changeMarginBottom(e.target.value);
  }

  return (
    <VStackBox w="100%" gap=".5rem" justify="space-between" mt="1rem">
      <FormControlInputNumber
        id={`minFontSize-${stepId}`}
        label={`Min font size at ${breakpointViewportMinSize()}px`}
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={minFontSize}
        onChange={(e) => onChangeMinFontSize(e)}
        maxW="70px"
      />
      <FormControlInputNumber
        id={`maxFontSize-${stepId}`}
        label={`Max font size at ${breakpointViewportMaxSize()}px`}
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={maxFontSize}
        onChange={(e) => onChangeMaxFontSize(e)}
        maxW="70px"
      />
      <FormControlInputNumber
        id={`lineHeight-${stepId}`}
        label="Line Height"
        labelFontSize="smaller"
        leftUnit="%"
        value={lineHeight}
        unitFontSize="smaller"
        onChange={(e) => onChangeLineHeight(e)}
        maxW="70px"
      />
      <FormControlInputNumber
        id={`margin-bottom-${stepId}`}
        label="Margin Bottom"
        labelFontSize="smaller"
        leftUnit="REM"
        value={marginBottom}
        unitFontSize="smaller"
        onChange={(e) => onChangeMarginBottom(e)}
        maxW="70px"
      />
    </VStackBox>
  );
}
