import { Button, Heading, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import VStackBox from "~/components/shared/vstack-wrapper";
import useMediaQueriesRoutesNavigate from "~/domain/media-queries/useMediaQueriesRoutesNavigate";
import useMediaQueriesService from "~/domain/media-queries/useMediaQueriesService";

export default function MediaQueriesRemoveAll() {
  const { navigateToEditMediaQuery } = useMediaQueriesRoutesNavigate();
  const { deleteAllMediaQueries } = useMediaQueriesService();
  const [showRemoveAllButton, setShowRemoveAllButton] = useState(false);

  function onShowRemoveAllButton() {
    setShowRemoveAllButton(true);
  }

  function onRedirectToEdit() {
    navigateToEditMediaQuery();
  }

  function onRemoveAllMediaQueries() {
    deleteAllMediaQueries();
  }

  return (
    <VStackBox gap="2rem">
      <Heading fontSize={"lg"} color="primary.500">
        Danger Zone
      </Heading>
      <VStackBox>
        <Heading fontSize={"md"} color="primary.500">
          You will remove all media queries created.
        </Heading>
        <Text fontSize={"md"} color="primary.500">
          There is no way to revert this operation.
        </Text>
      </VStackBox>
      <VStackBox spacing={2}>
        <Text fontSize={"md"} color="primary.500">
          Are you sure?
        </Text>
        <HStack>
          <Button
            variant="outline"
            color="primary.500"
            onClick={onShowRemoveAllButton}
            _hover={{
              color: "background.500",
              background: "primary.500",
            }}
          >
            Yes
          </Button>
          <Button bg="secondary.300" onClick={onRedirectToEdit}>
            No, go back
          </Button>
        </HStack>
      </VStackBox>
      {showRemoveAllButton && (
        <Button bg="secondary.300" onClick={onRemoveAllMediaQueries}>
          Remove all media queries
        </Button>
      )}
    </VStackBox>
  );
}
