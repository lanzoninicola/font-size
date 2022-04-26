import ConverterPixelsRems from "~/components/settings/converter-pixels-rems";
import FormControlInputNumber from "~/components/shared/form-control-input-number";
import SectionHeader from "~/components/shared/section-header";
import VStackBox from "~/components/shared/vstack-wrapper";
import usePixelsPerRem from "~/context/app/hooks/usePixelsPerRemSelector";

export default function SettingsPage() {
  const { pixelsPerRem, setPixelsPerRem } = usePixelsPerRem();

  function onChangePixelsPerRem(pixels: string) {
    setPixelsPerRem(parseInt(pixels, 10));
  }

  return (
    <VStackBox gap="1rem" marginBlock="2rem">
      <SectionHeader>Settings</SectionHeader>
      <VStackBox gap="1.2rem">
        {/* TODO: miss validation (eg. I can set zero that it is not correct) */}
        <FormControlInputNumber
          id="rems"
          label="1 rem"
          value={pixelsPerRem}
          unit="PX"
          onChange={(e) => onChangePixelsPerRem(e.target.value)}
        />
        <ConverterPixelsRems />
      </VStackBox>
    </VStackBox>
  );
}
