import { useState } from "react";

export default function ModalHook() {
  const [showModal, setShowModal] = useState<boolean>(false);

  function openModal() {
    setShowModal(true);
  }

  return { openModal, showModal, setShowModal };
}
