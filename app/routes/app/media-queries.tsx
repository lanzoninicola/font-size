import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
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
        <Outlet />
      </MediaQueryBuilderProvider>
    </Box>
  );
}
