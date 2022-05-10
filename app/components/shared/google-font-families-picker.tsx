import { forwardRef, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FontFamily } from "~/domain/google-fonts/interfaces";
import InputSelect from "./input-select";

interface GoogleFontsProps {
  fonts: FontFamily[];
  [key: string]: any;
}

const GoogleFontFamiliesPicker = ({
  fonts,
  onChange,
  ...props
}: GoogleFontsProps) => {
  return (
    <HStack>
      {/* <Text color="primary.500" fontSize="smaller">
        Family
      </Text> */}
      <InputSelect
        maxW="250px"
        fontSize={"smaller"}
        textAlign="left"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target);
        }}
        value={props.value}
        {...props}
      >
        {fonts.map((font, index) => (
          <option
            key={index}
            // value={`${font.family}|${font.variants.join(",")}`}
            value={font.family}
            data-weights={font.variants.join(",")}
          >
            {font.family}
          </option>
        ))}
      </InputSelect>
    </HStack>
  );
};

export default GoogleFontFamiliesPicker;
