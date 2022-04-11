import { HStack, Text } from "@chakra-ui/react";
import { SyntheticEvent } from "react";
import FormControlLabel from "~/components/shared/form-control-label";
import InputNumber from "~/components/shared/input-number";

export default function FormControlInputNumber({
  id,
  label,
  value,
  unit,
  onChange,
}: {
  id: string;
  label?: string;
  value?: number;
  unit: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <HStack
      w="100%"
      aria-label={label && `Set the ${label.toLowerCase()}`}
      justify="space-between"
    >
      {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
      <HStack>
        <InputNumber value={value} onChange={onChange} />
        <Text color="primary.500" fontWeight={700} fontSize={"sm"} minW="40px">
          {unit.toUpperCase()}
        </Text>
      </HStack>
    </HStack>
  );
}
