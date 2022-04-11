import VStackBox from "../shared/vstack-wrapper";
import CodeRenderOptions from "./code-render-options";
import CodeRenderStandardCSS from "./code-render-standard-css";

export default function CodeSection() {
  return (
    <VStackBox align="flex-end" gap="1rem" w="100%">
      <CodeRenderOptions />
      <CodeRenderStandardCSS />
    </VStackBox>
  );
}
