import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import PageHeader from "~/components/shared/page-header";
import SectionSubHeader from "~/components/shared/section-subheader";
import { MediaQueryBuilderProvider } from "~/context/media-query-builder/media-query-builder-context";

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
  return (
    <Box>
      <MediaQueryBuilderProvider>
        <PageHeader>Media Queries</PageHeader>
        <Outlet />
      </MediaQueryBuilderProvider>
    </Box>
  );
}
