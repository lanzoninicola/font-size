import { HStack, Text } from "@chakra-ui/react";
import ActionButton from "./action-button";
import { EditIcon, TrashIcon } from "./icons";

export default function EntityList({
  entityName,
  children,
  onEdit,
  onDelete,
}: {
  entityName: string;
  children: React.ReactElement;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <HStack
      justify={"space-between"}
      w="100%"
      _hover={{
        cursor: "pointer",
        backgroundColor: "gray.100",
        borderRadius: "5px",
        paddingLeft: "1rem",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Text color="secondary.700">{entityName}</Text>
      <HStack gap="1.5rem">
        <HStack gap="1rem">{children}</HStack>
        <HStack>
          <ActionButton label="Edit entity" noHoverbg onClick={onEdit}>
            <EditIcon ariaLabel="Edit entity" color="green" />
          </ActionButton>
          <ActionButton label="Remove entity" noHoverbg onClick={onDelete}>
            <TrashIcon ariaLabel="Remove entity" color="green" size={20} />
          </ActionButton>
        </HStack>
      </HStack>
    </HStack>
  );
}
