import { forwardRef, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useLoaderData } from "remix";
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
      <Text color="primary.500" fontSize="smaller">
        Family
      </Text>
      <InputSelect
        w="100%"
        fontSize={"smaller"}
        textAlign="left"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        maxW="150px"
        {...props}
      >
        {fonts.map((font, index) => (
          <option
            key={index}
            value={`${font.family}|${font.variants.join(",")}`}
          >
            {font.family}
          </option>
        ))}
      </InputSelect>
    </HStack>
  );
};

export default GoogleFontFamiliesPicker;
