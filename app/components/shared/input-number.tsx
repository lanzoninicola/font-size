import { forwardRef, Input } from "@chakra-ui/react";

const InputNumber = forwardRef<{ [key: string]: any }, "input">(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <Input
        type="number"
        inputMode="decimal"
        pattern="[0-9]*"
        variant={"filled"}
        h="50px"
        maxW="120px"
        borderRadius="15px"
        border="none"
        bg="primary.500"
        _focus={{
          outline: "none",
          background: "primary.500",
        }}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default InputNumber;
