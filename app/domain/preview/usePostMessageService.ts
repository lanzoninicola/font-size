import { useEffect } from "react";

export default function usePostMessageService() {
  //TODO: adjust target origin
  const TARGET_ORIGIN = "*";

  // TODO: infer type for message
  function postMessage({
    iframeRef,
    message,
  }: {
    iframeRef: React.RefObject<HTMLIFrameElement>;
    message: any;
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

          const iframeBody = document.getElementsByTagName("body");

          if (iframeBody[0]) {
            const style = document.createElement("style");
            style.textContent = event.data;

            iframeBody[0].appendChild(style);
          }
        },
        false
      );
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
