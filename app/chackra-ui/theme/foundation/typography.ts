import { theme as chakraTheme } from "@chakra-ui/react";

const typography = {
  fontWeights: {
    ...chakraTheme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700,
  },
  fonts: {
    ...chakraTheme.fonts,
    heading: `Open Sans, ${chakraTheme.fonts.heading}`,
    body: `Open Sans, ${chakraTheme.fonts.body}`,
  },
  fontSizes: {
    ...chakraTheme.fontSizes,
  },
};

export default typography;
