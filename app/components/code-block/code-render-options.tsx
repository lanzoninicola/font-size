import InputSelect from "../shared/input-select";

export enum CodeRenderOptionsKeys {
  standard_css = "standard-css",
  chackra_ui = "chackra-ui",
}

type CodeRenderOptions = Record<CodeRenderOptionsKeys, string>;

export default function CodeRenderOptions() {
  const OPTIONS: CodeRenderOptions = {
    "standard-css": "Standard CSS",
    "chackra-ui": "Chakra UI",
  };

  return (
    <InputSelect minW="250px">
      {Object.keys(OPTIONS).map((key, idx) => {
        return (
          <option key={idx} value={key}>
            {OPTIONS[key as keyof CodeRenderOptions]}
          </option>
        );
      })}
    </InputSelect>
  );
}
