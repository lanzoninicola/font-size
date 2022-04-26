import { useEffect } from "react";
import { Outlet } from "remix";
import VStackBox from "~/components/shared/vstack-wrapper";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesRoutesNavigate from "~/domain/media-queries/useMediaQueriesRoutesNavigate";

export default function MediaQueriesIndexPage() {
  const { isBreakpointsEmpty } = useBreakpointsQueryService();

  const { navigateToList, navigateToMissingBreakpoints } =
    useMediaQueriesRoutesNavigate();

  useEffect(() => {
    if (!isBreakpointsEmpty()) {
      navigateToList();
    } else {
      navigateToMissingBreakpoints();
    }
  }, [isBreakpointsEmpty()]);

  return (
    <>
      <VStackBox gap="2rem">
        <Outlet />
      </VStackBox>
    </>
  );
}
