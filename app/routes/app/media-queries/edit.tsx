import { Outlet } from "remix";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import InnerContentColumn from "~/components/layout/inner-content-column";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import PreviewIndex from "~/components/preview/preview-index";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import { PreviewProvider } from "~/context/preview/preview-context";

export default function MediaQueriesEditOutletPage() {
  return (
    <FlexRowWrap>
      <FlexRowWrapColumn
        wrapAt="600px"
        maxW="650px"
        borderRight="1px solid"
        borderRightColor={"primaryAlpha.20"}
        minH="800px"
      >
        <InnerPageHeaderArea>
          <SectionSubHeader>Builder</SectionSubHeader>
          <MediaQueriesToolbar />
        </InnerPageHeaderArea>
        <InnerContentColumn paddingTop={"0.5rem"}>
          <VStackBox gap="2rem" paddingInlineStart="2rem" paddingRight="1rem">
            <MediaQueryEdit />
          </VStackBox>
        </InnerContentColumn>
      </FlexRowWrapColumn>

      <FlexRowWrapColumn wrapAt="600px" h="auto" paddingRight="1rem">
        <PreviewProvider>
          <VStackBox
            h="100px"
            borderBottom="1px solid"
            borderBottomColor="primaryAlpha.20"
            paddingInlineStart="2rem"
            paddingRight="1rem"
          >
            <SectionSubHeader>Preview</SectionSubHeader>
            <PreviewToolbar />
          </VStackBox>
          <PreviewIndex />
        </PreviewProvider>
      </FlexRowWrapColumn>
    </FlexRowWrap>
  );
}
