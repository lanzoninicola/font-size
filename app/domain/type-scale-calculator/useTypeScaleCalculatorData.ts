import { TypeScaleRatio } from "~/context/type-scale-calculator-form/interfaces";

export default function useTypeScaleCalculatorData() {
  function getTypeScaleRatio(): TypeScaleRatio[] {
    return [
      {
        key: "minorSecond",
        name: "Minor second",
        ratio: 1.067,
      },
      {
        key: "majorSecond",
        name: "Major second",
        ratio: 1.125,
      },
      {
        key: "minorThird",
        name: "Minor third",
        ratio: 1.2,
      },
      {
        key: "majorThird",
        name: "Major third",
        ratio: 1.25,
      },
      {
        key: "perfectFourth",
        name: "Perfect fourth",
        ratio: 1.333,
      },
      {
        key: "augmentedFourth",
        name: "Augmented fourth",
        ratio: 1.414,
      },
      {
        key: "perfectFifth",
        name: "Perfect fifth",
        ratio: 1.5,
      },
      {
        key: "goldenRatio",
        name: "Golden ratio",
        ratio: 1.618,
      },
    ];
  }

  return {
    getTypeScaleRatio,
  };
}
