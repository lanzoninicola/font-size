import { forwardRef, Input } from "@chakra-ui/react";

const InputText = forwardRef<{ [key: string]: any }, "input">((props, ref) => {
  const { ...rest } = props;
  return (
    <Input
      type="text"
      variant={"filled"}
      h="40px"
      maxW="120px"
      borderRadius="10px"
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
});

export default InputText;
