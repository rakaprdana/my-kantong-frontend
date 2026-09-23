import { Button } from "../../../@/components/ui/button";
import { useGetIncomeTotal, useGetOutcomeTotal } from "../../hooks/useGetTotal";
import ModalHook from "../../hooks/useModal";
import CardLayout from "../layout/card-layout";
import ModalLayout from "../layout/modal-layout";
import SideBarLayout from "../layout/sidebar-layout";

export default function MainDashboard() {
  const { showModal, openModal, setShowModal } = ModalHook();
  const { incomeTotal } = useGetIncomeTotal();
  const { outcomeTotal } = useGetOutcomeTotal();

  return (
    <main className="flex">
      <SideBarLayout />
      <section className="w-full p-8">
        <div className="flex space-x-4 items-center">
          <h1 className="text-3xl text-mainColor font-bold">Dashboard</h1>
          <Button onClick={openModal}>Input Data</Button>
          <ModalLayout
            canShow={showModal}
            onClose={() => setShowModal(false)}
          />
        </div>
        <div className="grid grid-cols-2 space-x-8 w-full p-4">
          <CardLayout title="Income Total +" amount={incomeTotal} />
          <CardLayout title="Outcome Total -" amount={outcomeTotal} />
        </div>
      </section>
    </main>
  );
}
