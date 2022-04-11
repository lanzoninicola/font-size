import VStackBox from "../shared/vstack-wrapper";
import PreviewItem from "./preview-item";

export default function PreviewSection() {
  return (
    <VStackBox className="vstackbox" bg="blue" flex={"1 0 600px"} p="1rem">
      <PreviewItem />
      <PreviewItem />
    </VStackBox>
  );
}
