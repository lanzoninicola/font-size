import { Typography } from "../types/typography";

type UseTypographyInitialState = {
  get: () => Typography;
};

export default function useTypographyInitialState(): UseTypographyInitialState {
  function get() {
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

  return {
    get,
  };
}
