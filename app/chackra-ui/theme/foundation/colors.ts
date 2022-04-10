import { Colors, theme as chakraTheme } from "@chakra-ui/react";

const colors: Colors = {
  ...chakraTheme.colors,
  primaryAlpha: {
    20: "rgba(248, 248, 248, 0.2)",
    40: "rgba(248, 248, 248, 0.4)",
    60: "rgba(248, 248, 248, 0.6)",
    80: "rgba(248, 248, 248, 0.8)",
  },
  primary: {
    500: "#F8F8F8",
  },
  background: {
    500: "#1F2028",
  },
};

export default colors;
