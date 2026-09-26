import { Button } from "../../../../@/components/ui/button";
import ModalHook from "../../../hooks/useModal";
import type { ModalType } from "../../../types/ModalType";
import IncomeModal from "./income-modal";
import OutcomeModal from "./outcome-modal";

export default function ModalLayout({
  canShow,
  onClose,
  onSuccess,
}: ModalType) {
  const { showModal, openModal, setShowModal } = ModalHook();
  if (!canShow) {
    return null;
  }

  switch (showModal) {
    case "outcome":
      return (
        <OutcomeModal
          canShow={showModal}
          onClose={() => {
            setShowModal(false);
            onClose();
          }}
          onSuccess={onSuccess}
        />
      );
      break;
    case "income":
      return (
        <IncomeModal
          canShow={showModal}
          onClose={() => {
            setShowModal(false);
            onClose();
          }}
          onSuccess={onSuccess}
        />
      );
      break;
    default:
      break;
  }

  return (
    <section className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white shadow-lg p-6 w-[400px] flex flex-col items-center gap-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h1 className="text-xl font-semibold text-gray-800">
          Select form type
        </h1>
        <p className="text-gray-600 text-center">
          Please choose whether you want to enter{" "}
          <span className="font-medium">Income</span> or{" "}
          <span className="font-medium">Outcome data</span>.
        </p>

        <div className="flex gap-4 w-full">
          <Button
            onClick={() => openModal("income")}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 transition"
          >
            Income
          </Button>

          <Button
            onClick={() => openModal("outcome")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 transition"
          >
            Outcome
          </Button>
        </div>
      </div>
    </section>
  );
}
