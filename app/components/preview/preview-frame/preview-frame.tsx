import { Grid } from "@chakra-ui/react";
import { useState } from "react";
import { PreviewDevice } from "~/context/preview/types";

import PreviewFrameToolbar from "./preview-frame-toolbar";
import PreviewIframe from "./preview-iframe";

interface PreviewDeviceProps {
  device: PreviewDevice;
}

export default function PreviewFrame({ device }: PreviewDeviceProps) {
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);

  function onMouseEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    setShowRemoveIcon(true);
  }

  function onMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    setShowRemoveIcon(false);
  }

  return (
    <Grid
      gridTemplateRows={"auto 1fr"}
      gap="1rem"
      padding="1rem"
      _hover={{
        cursor: "pointer",
        backgroundColor: "secondaryAlpha.40",
        borderRadius: "5px",
        transition: "all .2s ease-in-out",
      }}
      position="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <PreviewFrameToolbar device={device} showRemoveIcon={showRemoveIcon} />
      <PreviewIframe device={device} />
    </Grid>
  );
}
