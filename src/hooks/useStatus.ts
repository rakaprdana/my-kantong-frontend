import { AxiosError } from "axios";
import { useState } from "react";

export default function useStatus() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  function callStatusAndMessage(
    status: "idle" | "loading" | "success" | "error",
    message: unknown,
  ) {
    setStatus(status);
    if (typeof message === "string") {
      setMessage(message);
    } else {
      switch (status) {
        case "error": {
          const isAxiosError =
            message instanceof AxiosError && message.response?.data?.error;
          setMessage(
            isAxiosError
              ? message.response?.data?.error
              : "Unexpected error occurred",
          );
          break;
        }

        default:
          break;
      }
    }
  }

  return { callStatusAndMessage, status, message };
}
