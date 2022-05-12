import { Typography } from "~/context/app/interfaces";

export default function getTypographyInitialState(): Typography {
  return {
    headings: {
      fontFamily: "Inter",
      fontWeight: "400",
    },
    body: {
      fontFamily: "Inter",
      fontWeight: "400",
    },
  };
}
