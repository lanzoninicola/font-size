import { useEffect } from "react";
import { Outlet } from "remix";
import MediaQueryEdit from "~/components/media-queries/media-query-edit";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesRoutesNavigate from "~/domain/media-queries/useMediaQueriesRoutesNavigate";

export default function MediaQueriesIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  const { navigateToEditMediaQuery, navigateToMissingBreakpoints } =
    useMediaQueriesRoutesNavigate();

  useEffect(() => {
    if (isBreakpointsEmpty()) {
      navigateToMissingBreakpoints();
    } else {
      navigateToEditMediaQuery();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <>
      <MediaQueryEdit />
    </>
  );
}
