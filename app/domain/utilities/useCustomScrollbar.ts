/**
 * @description Returns the objet style that render a custom scrollbar
 * This is specific for Chakra UI "css" prop
 * @returns {object}
 */
export default function useCustomScrollbar() {
  return {
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },

    "&::-webkit-scrollbar-track": {
      borderRadius: "20px",
      backgroundColor: "#2F303C",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#159898",
      borderRadius: "20px",
      "&: hover": {
        backgroundColor: "#AEF4F4",
        transition: "all 0.2s ease-in-out",
      },
    },
  };
}
