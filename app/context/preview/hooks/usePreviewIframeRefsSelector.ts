import { useContextSelector } from "use-context-selector";
import { FontConfig } from "~/context/app/interfaces";
import { Message, TypographyMessage } from "~/domain/preview/types";
import { usePostMessage } from "~/domain/preview/usePostMessage";
import { PreviewContextData } from "../preview-context";

export default function usePreviewIframeRefsSelector() {
  const iframeRefs = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.iframeRefs
  );

  const setIframeRefs = useContextSelector(
    PreviewContextData,
    (ctx) => ctx?.setIframeRefs
  );

  const actions = {
    PREVIEW__ADD_IFRAME_REF: {
      dispatch: (payload: React.RefObject<HTMLIFrameElement>) =>
        addRef(payload),
    },
    PREVIEW__REMOVE_IFRAME_REF: {
      dispatch: (payload: React.RefObject<HTMLIFrameElement>) =>
        removeRef(payload),
    },
    PREVIEW__REMOVE_ALL_IFRAME_REFS: {
      dispatch: () => removeAllRefs(),
    },
    PREVIEW__POST_MESSAGE_CHANGED_BODY_FONT: {
      dispatch: (payload: TypographyMessage) =>
        publishSelectedBodyFont(payload),
    },

    // PREVIEW__POST_MESSAGE_CHANGED_BODY_FONT_WEIGHT: {
    //   dispatch: (payload: FontConfig["fontWeight"]) =>
    //     publishSelectedBodyFont(payload),
    // },
    // PREVIEW__CHANGED_HEADERS_FONT_POST_MESSAGE: {
    //   dispatch: (payload: FontConfig) => publishSelectedBodyFont(payload),
    // },
  };

  const { postMessage } = usePostMessage();

  function addRef(payload: React.RefObject<HTMLIFrameElement>) {
    const nextIframeRefs = [...iframeRefs, payload];
    console.log("addRef", nextIframeRefs);
    setIframeRefs(nextIframeRefs);
  }

  function removeRef(payload: React.RefObject<HTMLIFrameElement>) {
    const nextIframeRefs = iframeRefs.filter(
      (iframeRef) => iframeRef !== payload
    );

    setIframeRefs(nextIframeRefs);
  }

  function removeAllRefs() {
    setIframeRefs([]);
  }

  function publishSelectedBodyFont(payload: TypographyMessage) {
    console.log(iframeRefs);
    iframeRefs.forEach((iframeRef) => {
      postMessage(iframeRef, payload);
    });
  }

  return {
    iframeRefs,
    actions,
  };
}
