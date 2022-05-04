import { Center } from "@chakra-ui/react";
import SelectorsList from "~/components/selectors/selectors-list";
import EntityStateIdleMessage from "~/components/shared/entity-state-idle-message";
import useSelectorsQueryService from "~/domain/selectors/useSelectorsQueryService";

export default function SelectorsPage() {
  const { isSelectorsEmpty } = useSelectorsQueryService();

  console.log(isSelectorsEmpty());

  return (
    <>
      {isSelectorsEmpty() && (
        <Center h="100%" w="100%">
          <EntityStateIdleMessage context="selectors" />
        </Center>
      )}
      {!isSelectorsEmpty() && <SelectorsList />}
    </>
  );
}
