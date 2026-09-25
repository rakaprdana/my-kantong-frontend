import { Button } from "../../../@/components/ui/button";
import { useGetIncomeTotal, useGetOutcomeTotal } from "../../hooks/useGetTotal";
import ModalHook from "../../hooks/useModal";
import CardLayout from "../layout/card-layout";
import MonthlyOutcomeChart from "../layout/chart/montlhly-chart";
import ModalLayout from "../layout/modal/modal-layout";
import SideBarLayout from "../layout/sidebar-layout";

export default function MainDashboard() {
  const { incomeTotal, refetch: refecthIncome } = useGetIncomeTotal();
  const { outcomeTotal, refetch: refecthOutcome } = useGetOutcomeTotal();
  const { showModal, openModal, setShowModal, handleSuccessAndRefresh } =
    ModalHook(() => {
      refecthIncome();
      refecthOutcome();
    });

  return (
    <main className="flex">
      <SideBarLayout />
      <section className="w-full p-4">
        <div className="flex space-x-4 items-center">
          <h1 className="text-3xl text-mainColor font-bold">Dashboard</h1>
          <Button
            onClick={() => {
              openModal(true);
            }}
            className={"bg-mainColor"}
          >
            Input Data
          </Button>
          <ModalLayout
            canShow={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={handleSuccessAndRefresh}
          />
        </div>
        <div className="grid grid-cols-2 space-x-8 w-full py-4">
          <CardLayout title="Income Total +" amount={incomeTotal} />
          <CardLayout title="Outcome Total -" amount={outcomeTotal} />
        </div>
        <div>
          <MonthlyOutcomeChart year={new Date().getFullYear()} />
        </div>
      </section>
    </main>
  );
}
