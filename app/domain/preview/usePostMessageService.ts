import { useEffect } from "react";

import useGoogleFontsUtils from "../google-fonts/useGoogleFontsUtils";
import { Message, PostMessage } from "./types/indext";

export default function usePostMessageService() {
  //TODO: adjust target origin
  const TARGET_ORIGIN = "*";

  const { getGoogleFontLinkTagHref } = useGoogleFontsUtils();

  /** This function is fired inside the useEffect of iframe-box component to send messages to preview iframes*/
  function postMessage({ iframeRef, message }: PostMessage) {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, TARGET_ORIGIN);
    }
  }

  /** This function is used inside the page (/preview/content) that contains the content template */
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
