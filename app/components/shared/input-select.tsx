import { forwardRef, Select } from "@chakra-ui/react";

const InputSelect = forwardRef<{ [key: string]: any }, "select">(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <Select
        variant={"filled"}
        h="40px"
        maxW="120px"
        textAlign="right"
        borderRadius="10px"
        border="none"
        bg="primary.500"
        _focus={{
          outline: "none",
          background: "primary.500",
        }}
        ref={ref}
        {...rest}
      >
        {props.children}
      </Select>
    );
  }
);

export default InputSelect;
