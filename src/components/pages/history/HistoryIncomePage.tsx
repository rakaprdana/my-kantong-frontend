import SideBarLayout from "../../layout/sidebar-layout";
import IncomeTableLayout from "../../layout/table/income-table";

export default function HistoryIncomePage() {
  return (
    <main className="flex">
      <SideBarLayout />
      <section className="w-full p-8">
        <h1 className="text-2xl text-mainColor font-bold mb-8">
          Income History
        </h1>
        <IncomeTableLayout />
      </section>
    </main>
  );
}
