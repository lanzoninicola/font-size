import parseInputString from "./parseInputString";

/**
 * *
 * @description This function is intended for use with the control
 * of the input form of type string when the onChange event is triggered.
 * The input value will be used as decimal value
 *
 * @param {string} value - The value of an Input to parse
 * @returns {number} - Float decimal number
 */
export default function parseDecimalNumber(value: string) {
  let parsedValue = parseInputString(value);

  if (parsedValue === null || parsedValue === "") {
    parsedValue = "0";
  }

  return parseFloat(parseInputString(parsedValue));
}
