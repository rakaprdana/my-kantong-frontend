import SideBarLayout from "../../layout/sidebar-layout";
import OutcomeTableLayout from "../../layout/table/outcome-table";

export default function HistoryOutcomePage() {
  return (
    <main className="flex">
      <SideBarLayout />
      <section className="w-full p-8">
        <h1 className="text-2xl text-mainColor font-bold mb-8">
          Outcome History
        </h1>
        <OutcomeTableLayout />
      </section>
    </main>
  );
}
