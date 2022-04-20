import { HStack } from "@chakra-ui/react";
import { Outlet, useNavigate } from "remix";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import InnerContentColumn from "~/components/layout/inner-content-column";
import SectionSubHeaderWrapper from "~/components/layout/section-sub-header-wrapper";
import ToolbarWrapper from "~/components/layout/toolbar-wrapper";
import ActionButton from "~/components/shared/action-button";
import { NavigateBackIcon } from "~/components/shared/icons";
import SectionSubHeader from "~/components/shared/section-subheader";
import VStackBox from "~/components/shared/vstack-wrapper";

export default function EditBreakpointPage() {
  const navigate = useNavigate();

  function onNavigateBack() {
    navigate(-1);
  }

  return (
    <>
      <FlexRowWrapColumn
        wrapAt="600px"
        maxW="650px"
        borderRight="1px solid"
        borderRightColor={"primaryAlpha.20"}
        minH="800px"
      >
        <SectionSubHeaderWrapper>
          <SectionSubHeader>Builder</SectionSubHeader>
          <ToolbarWrapper justify="space-between">
            <HStack>
              <ActionButton label="Go back" onClick={onNavigateBack}>
                <NavigateBackIcon />
              </ActionButton>
            </HStack>
          </ToolbarWrapper>
        </SectionSubHeaderWrapper>
        <InnerContentColumn paddingTop={"0.5rem"}>
          <VStackBox gap="2rem" paddingInlineStart="2rem" paddingRight="1rem">
            <Outlet />
          </VStackBox>
        </InnerContentColumn>
      </FlexRowWrapColumn>

      <FlexRowWrapColumn wrapAt="600px" maxW={`calc(100vw - 850px)`} h="auto">
        {/*<SectionSubHeaderWrapper>
          <SectionSubHeader>Preview</SectionSubHeader>
        </SectionSubHeaderWrapper>
      <PreviewIndex /> */}
      </FlexRowWrapColumn>
    </>
  );
}
