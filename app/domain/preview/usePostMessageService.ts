import { useEffect } from "react";
import { FontConfig } from "~/context/app/interfaces";

import useGoogleFontsUtils from "../google-fonts/useGoogleFontsUtils";
import { Message, PostMessage } from "./types";

export default function usePostMessageService() {
  //TODO: adjust target origin
  const TARGET_ORIGIN = "*";

  const { getGoogleFontLinkTagHref } = useGoogleFontsUtils();

  /**
   * @description This function is fired inside the useEffect of iframe-box component
   * to send messages to preview iframes
   *
   * */
  function postMessage({ iframeRef, message }: PostMessage) {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, TARGET_ORIGIN);
    }
  }

  /**
   * @description This function is used inside the page (/preview/content)
   * that contains the content template
   *
   * */
  function handleMessages() {
    if (window) {
      window.addEventListener(
        "message",
        (event) => {
          //TODO: adjust target origin
          // if (event.origin !== "https://font-size-eight.vercel.app") return;

          const messageReceived = event.data as Message;
          const {
            stylesheetMediaQueriesCode,
            stylesheetTypographyCode,
            fontHeading,
            fontBody,
          } = messageReceived;

          if (stylesheetTypographyCode) {
            addStyleTag(stylesheetTypographyCode);
          }
          if (fontHeading) {
            addGoogleFontLinkTag(fontHeading);
          }

          if (fontBody) {
            addGoogleFontLinkTag(fontBody);
          }

          if (stylesheetMediaQueriesCode) {
            addStyleTag(stylesheetMediaQueriesCode);
          }
        },
        false
      );
    }
  }

  /**
   * @description Adds the <link> tag for the Google Fonts
   * @param {array} - fontHeading or fontBody or both
   *
   * @private
   */
  function addGoogleFontLinkTag(...fonts: FontConfig[]) {
    const iframeBody = document.getElementsByTagName("body");
    const url = getGoogleFontLinkTagHref(...fonts);

    if (iframeBody[0]) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;

      iframeBody[0].appendChild(link);
    }
  }

  /**
   * @description Adds the <style> tag for the typography stylesheet
   * @param stylesheetCode
   * @private
   * */
  function addStyleTag(stylesheetCode: string) {
    const iframeBody = document.getElementsByTagName("body");

    if (iframeBody[0]) {
      const style = document.createElement("style");
      style.textContent = stylesheetCode;

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
