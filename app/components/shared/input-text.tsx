import { forwardRef, Input } from "@chakra-ui/react";

const InputText = forwardRef<{ [key: string]: any }, "input">((props, ref) => {
  const { ...rest } = props;
  return (
    <Input
      type="text"
      variant={"filled"}
      h="30px"
      maxW="120px"
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
});

export default InputText;
