/**
 * @description: add the unit to the CSS prop value
 * @param value - the CSS value
 * @param unit - the CSS unit
 * @returns {string} - "${value}${unit}"
 *
 * @private
 * */
export default function withUnit(value: number, unit: string = "rem") {
  return `${value}${unit}`;
}
