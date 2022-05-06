import { forwardRef, Select } from "@chakra-ui/react";

const InputSelect = forwardRef<{ [key: string]: any }, "select">(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <Select
        variant={"filled"}
        h="30px"
        maxW="120px"
        textAlign="left"
        borderRadius="5px"
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
