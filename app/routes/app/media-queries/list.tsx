import { Center } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import InnerPageContentArea from "~/components/layout/inner-page-content-area";
import InnerPageHeaderArea from "~/components/layout/inner-page-header-area";
import MediaQueriesToolbar from "~/components/media-queries/media-queries-toolbar";
import MediaQueryList from "~/components/media-queries/media-query-list";
import EntityStateIdleMessage from "~/components/shared/entity-state-idle-message";
import SectionSubHeader from "~/components/shared/section-subheader";
import useMediaQueriesSelector from "~/context/app/hooks/useMediaQueriesSelector";
import useMediaQueriesQueryService from "~/domain/media-query/useMediaQueriesQueryService";

export default function MediaQueryListPage() {
  const { mediaQueries } = useMediaQueriesSelector();
  const { isMediaQueryEmpty } = useMediaQueriesQueryService();

  const [showAddMediaQueryMessage, setShowAddMediaQueryMessage] =
    useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // TODO: Need to refactor: Hack to handle the null init state with a "loading" state due to the action of reading from the local storage.
  async function loadMediaQueries() {
    try {
      const mediaQueryEmpty = await isMediaQueryEmpty();
      if (mediaQueryEmpty) {
        setShowAddMediaQueryMessage(true);
      } else {
        setShowAddMediaQueryMessage(false);
      }
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(false);
    }
  }

  useEffect(() => {
    loadMediaQueries();
  }, [mediaQueries]);

  return (
    <>
      <InnerPageHeaderArea paddingLeft="2rem">
        <SectionSubHeader>List</SectionSubHeader>
        <MediaQueriesToolbar />
      </InnerPageHeaderArea>
      <InnerPageContentArea>
        {!isLoaded && <Center color="white">Loading...</Center>}

        {isLoaded && showAddMediaQueryMessage && (
          <Center h="100%" w="100%">
            <EntityStateIdleMessage context="media queries" />
          </Center>
        )}

        {isLoaded && !showAddMediaQueryMessage && <MediaQueryList />}
      </InnerPageContentArea>
    </>
  );
}
