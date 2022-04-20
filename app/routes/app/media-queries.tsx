import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import FlexRowWrap from "~/components/layout/flex-row-wrap";
import FlexRowWrapColumn from "~/components/layout/flex-row-wrap-column";
import BreakpointsMissingMessage from "~/components/shared/breakpoints-missing-message";
import PageHeader from "~/components/shared/page-header";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";

// export interface LoaderData {
//   ENV: {
//     IFRAME_ORIGIN: string;
//   };
//   senderId: string;
// }

// export async function loader() {
//   const uuid = uuidv4();

//   return json({
//     ENV: {
//       IFRAME_ORIGIN: process.env.IFRAME_ORIGIN,
//     },
//     senderId: uuid,
//   });
// }

export default function MediaQueriesPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  return (
    <Box>
      <PageHeader>Media Queries</PageHeader>

      <FlexRowWrap gap={0}>
        {isBreakpointsEmpty() && (
          <FlexRowWrapColumn wrapAt="600px" maxW={`auto`} h="auto">
            <BreakpointsMissingMessage />
          </FlexRowWrapColumn>
        )}
        {!isBreakpointsEmpty() && <Outlet />}
      </FlexRowWrap>
    </Box>
  );
}
