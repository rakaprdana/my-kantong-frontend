import { useState } from "react";

export default function ModalHook(onRefresh?: () => void) {
  const [showModal, setShowModal] = useState<"income" | "outcome" | boolean>(
    false,
  );

  function openModal(modalContent: "income" | "outcome" | boolean) {
    setShowModal(modalContent);
  }

  function handleSuccessAndRefresh() {
    onRefresh?.();
  }

  return { openModal, showModal, setShowModal, handleSuccessAndRefresh };
}
