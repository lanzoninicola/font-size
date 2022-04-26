import { forwardRef, Input } from "@chakra-ui/react";

const InputNumber = forwardRef<{ [key: string]: any }, "input">(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <Input
        type="text"
        inputMode="decimal"
        pattern="[0-9]*"
        variant={"filled"}
        size={"sm"}
        minW="50px"
        borderRadius="5px"
        border="none"
        bg="primary.500"
        isDisabled={props.isDisabled}
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
