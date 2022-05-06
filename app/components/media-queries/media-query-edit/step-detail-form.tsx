import FormControlInputNumber from "~/components/shared/form-control-input-number";
import VStackBox from "~/components/shared/vstack-wrapper";
import { SelectorId } from "~/context/selectors-builder/interfaces";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesBuilderService from "~/domain/media-queries/useMediaQueriesBuilderService";

export function StepDetailForm({ selectorId }: { selectorId: SelectorId }) {
  const {
    minFontSize,
    maxFontSize,
    lineHeight,
    changeMinFontSize,
    changeMaxFontSize,
    changeLineHeight,
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

  return (
    <VStackBox w="100%" gap=".5rem" justify="space-between" mt="1rem">
      <FormControlInputNumber
        id={`minFontSize-${selectorId}`}
        label={`Min font size at ${breakpointViewportMinSize()}px`}
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={minFontSize}
        onChange={(e) => onChangeMinFontSize(e)}
        maxW="70px"
      />
      <FormControlInputNumber
        id={`maxFontSize-${selectorId}`}
        label={`Max font size at ${breakpointViewportMaxSize()}px`}
        labelFontSize="smaller"
        leftUnit="REM"
        unitFontSize="smaller"
        value={maxFontSize}
        onChange={(e) => onChangeMaxFontSize(e)}
        maxW="70px"
      />
      <FormControlInputNumber
        id={`lineHeight-${selectorId}`}
        label="Line Height"
        labelFontSize="smaller"
        leftUnit="%"
        value={lineHeight}
        unitFontSize="smaller"
        onChange={(e) => onChangeLineHeight(e)}
        maxW="70px"
      />
    </VStackBox>
  );
}
