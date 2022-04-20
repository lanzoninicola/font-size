import { HStack, Text } from "@chakra-ui/react";
import ActionButton from "./action-button";
import { EditIcon, TrashIcon } from "./icons";

export default function EntityListFullPage({
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
      paddingInline="1rem"
      justify={"space-between"}
      minW="50%"
      _hover={{
        cursor: "pointer",
        backgroundColor: "secondary.700",
        borderRadius: "5px",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <HStack spacing={8}>
        <HStack>
          <ActionButton label="Edit entity" noHoverbg onClick={onEdit}>
            <EditIcon ariaLabel="Edit entity" color="gray" />
          </ActionButton>
          <ActionButton label="Remove entity" noHoverbg onClick={onDelete}>
            <TrashIcon ariaLabel="Remove entity" color="gray" size={20} />
          </ActionButton>
        </HStack>
        <Text color="primary.500">{entityName}</Text>
      </HStack>
      <HStack gap="1.5rem">
        <HStack gap="1rem">{children}</HStack>
      </HStack>
    </HStack>
  );
}
