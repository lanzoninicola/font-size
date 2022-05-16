import { useCallback } from "react";
import { Message } from "./types";

export type PostMessage = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
  payload: Message
) => void;

export interface UsePostMessage {
  postMessage: PostMessage;
}

export const usePostMessage = (): UsePostMessage => {
  const TARGET_ORIGIN = "*";

  const postMessage = useCallback((iframeRef, payload) => {
    const element = iframeRef.current;
    if (element?.contentWindow == null) return;
    element.contentWindow.postMessage(payload, TARGET_ORIGIN);
    window.postMessage(payload, TARGET_ORIGIN);
  }, []);

  return {
    postMessage,
  };
};
