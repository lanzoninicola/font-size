import { useEffect } from "react";
import { FontConfigFormControl } from "~/context/type-scale-calculator-form/interfaces";

import useGoogleFontsUtils from "../google-fonts/useGoogleFontsUtils";

export interface Message {
  stylesheetCode: string;
  fontHeading: Omit<FontConfigFormControl, "breakpointId">;
  fontBody: Omit<FontConfigFormControl, "breakpointId">;
}

export default function usePostMessageService() {
  //TODO: adjust target origin
  const TARGET_ORIGIN = "*";

  const { getGoogleFontLinkTagHref } = useGoogleFontsUtils();

  function postMessage({
    iframeRef,
    message,
  }: {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    message: Message;
  }) {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, TARGET_ORIGIN);
    }
  }

  function handleMessages() {
    if (window) {
      window.addEventListener(
        "message",
        (event) => {
          //TODO: adjust target origin
          // if (event.origin !== "https://font-size-eight.vercel.app") return;

          const messageReceived = event.data as Message;
          const { stylesheetCode, fontHeading, fontBody } = messageReceived;

          if (stylesheetCode) {
            addTypographyStyleTag(stylesheetCode);
          }
          if (fontHeading && fontBody) {
            addGoogleFontLinkTag({ fontHeading, fontBody });
          }
        },
        false
      );
    }
  }

  function addGoogleFontLinkTag({
    fontHeading,
    fontBody,
  }: Omit<Message, "stylesheetCode">) {
    const iframeBody = document.getElementsByTagName("body");
    const url = getGoogleFontLinkTagHref(fontHeading, fontBody);

    if (iframeBody[0]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;

      iframeBody[0].appendChild(link);
    }
  }

  function addTypographyStyleTag(content: string) {
    const iframeBody = document.getElementsByTagName("body");

    if (iframeBody[0]) {
      const style = document.createElement("style");
      style.textContent = content;

      iframeBody[0].appendChild(style);
    }
  }

  useEffect(() => {
    return () => {
      if (window) {
        window.removeEventListener("message", handleMessages);
      }
    };
  }, []);

  return {
    postMessage,
    handleMessages,
  };
}
