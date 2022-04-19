import CodeIndex from "~/components/code/code-index";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import MediaQueryList from "~/components/media-queries/media-query-list";
import PreviewIndex from "~/components/preview/preview-index";
import PreviewToolbar from "~/components/preview/preview-toolbar";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";
import { PreviewProvider } from "~/context/preview/preview-context";

export default function MediaQueriesContent() {
  return (
    <>
      <FlexRowWrapColumn
        wrapAt="600px"
        maxW="650px"
        borderRight="1px solid"
        borderRightColor={"primaryAlpha.20"}
      >
        <MediaQueryBuilderProvider>
          <VStackBox
            h="100px"
            borderBottom="1px solid"
            borderBottomColor="primaryAlpha.20"
            paddingInlineStart="2rem"
            paddingRight="1rem"
          >
            <SectionSubHeader>Builder</SectionSubHeader>
            <MediaQueriesToolbar />
          </VStackBox>

          <MediaQueryEdit />
          <MediaQueryList />
        </MediaQueryBuilderProvider>

        <CodeIndex />
      </FlexRowWrapColumn>
      <FlexRowWrapColumn wrapAt="600px" h="auto" paddingRight="1rem">
        {/* <Box bg="blue" h="100px" w="100%" flex={"1 0 600px"}></Box> */}

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
    </>
  );
}
