import { Grid } from "@chakra-ui/react";
import { useState } from "react";
import usePreviewWindowsSelector from "~/context/preview/hooks/usePreviewWindowsSelector";
import usePreviewWindowsService from "~/domain/preview/usePreviewWindowsService";

import { TrashIcon } from "../shared/icons";
import IframeBox from "./iframe-box";
import PreviewDeviceToolbar from "./preview-device-toolbar";
import ActionButton from "../shared/action-button";

// TODO: ADD SENDER_ID TO IFRAME

export default function PreviewDevice({ idx }: { idx: number }) {
  const { removeWindow } = usePreviewWindowsService();
  const { previewWindows } = usePreviewWindowsSelector();

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

  function onRemovePreviewWindow(idx: number) {
    removeWindow(idx);
  }

  return (
    <Grid
      key={idx}
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
      <PreviewDeviceToolbar itemIdx={idx} />

      <IframeBox
        width={previewWindows[idx].width}
        height={previewWindows[idx].height}
      />

      {showRemoveIcon && (
        <ActionButton
          label="Remove window"
          position="absolute"
          top={3}
          right={4}
          onClick={() => onRemovePreviewWindow(idx)}
        >
          <TrashIcon size={20} />
        </ActionButton>
      )}
    </Grid>
  );
}