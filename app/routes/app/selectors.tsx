import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import SelectorsIndex from "~/components/selectors/selectors-index";

export default function SelectorsPage() {
  return (
    <FlexRowWrap>
      <FlexRowWrapColumn wrapAt="600px" maxW="650px">
        <SelectorsIndex />
      </FlexRowWrapColumn>
    </FlexRowWrap>
  );
}
