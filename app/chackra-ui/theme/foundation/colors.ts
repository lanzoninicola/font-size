import { Colors, theme as chakraTheme } from "@chakra-ui/react";

const colors: Colors = {
  ...chakraTheme.colors,
  primaryAlpha: {
    20: "rgba(248, 248, 248, 0.2)",
    40: "rgba(248, 248, 248, 0.4)",
    60: "rgba(248, 248, 248, 0.6)",
    80: "rgba(248, 248, 248, 0.8)",
  },
  backgroundAlpha: {
    20: "rgba(31, 32, 40, 0.2)",
    40: "rgba(31, 32, 40, 0.4)",
    60: "rgba(31, 32, 40, 0.6)",
    80: "rgba(31, 32, 40, 0.8)",
  },
  secondaryAlpha: {
    20: "rgba(101, 234, 234, 0.2)",
    40: "rgba(101, 234, 234, 0.4)",
    60: "rgba(101, 234, 234, 0.6)",
    80: "rgba(101, 234, 234, 0.8)",
  },

  primary: {
    500: "#F8F8F8",
  },
  background: {
    300: "#2F303C",
    500: "#1F2028",
  },
  secondary: {
    300: "#AEF4F4",
    500: "#65EAEA",
    700: "#159898",
  },
};

export default colors;
