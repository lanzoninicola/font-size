import { useToast } from "@chakra-ui/react";

export interface NotificationOptions {
  duration?: number;
  isClosable?: boolean;
}

export default function useNotifications() {
  const toast = useToast();

  function errorNotification(message: string, options?: NotificationOptions) {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: options?.duration || 9000,
      isClosable: options?.isClosable || true,
    });
  }

  function successNotification(message: string, options?: NotificationOptions) {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: options?.duration || 9000,
      isClosable: options?.isClosable || true,
    });
  }

  function warningNotification(message: string, options?: NotificationOptions) {
    toast({
      title: "Warning",
      description: message,
      status: "warning",
      duration: options?.duration || 9000,
      isClosable: options?.isClosable || true,
    });
  }

  function infoNotification(message: string, options?: NotificationOptions) {
    toast({
      title: "Info",
      description: message,
      status: "info",
      duration: options?.duration || 9000,
      isClosable: options?.isClosable || true,
    });
  }

  return {
    errorNotification,
    successNotification,
    warningNotification,
    infoNotification,
  };
}
