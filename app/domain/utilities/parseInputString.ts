/**
 * *
 * @description This function is intended for use with
 * the input form control of type string
 * whose value will be used as a decimal value
 *
 * @param {string} value - The value of an Input to parse
 * @returns {string} - The parsed value
 */
export default function parseInputString(value: string): string {
  return value
    .split("")
    .filter((char) => {
      if (char.match(/[0-9]/)) {
        return char;
      }

      if (char.match(/[.]/)) {
        return char;
      }

      // if (char.match(/[,]/)) {
      //   return char;
      // }

      if (char.match(/[-]/)) {
        return char;
      }
    })
    .join("");
}
