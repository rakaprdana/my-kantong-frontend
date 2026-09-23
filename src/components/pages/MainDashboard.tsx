import SideBarLayout from "../layout/sidebar-layout";

export default function MainDashboard() {
  return (
    <main className="border border-red-500 flex">
      <SideBarLayout />
      <section className="border border-blue-500 w-full p-8">
        <h1 className="text-3xl text-mainColor font-bold">Dashboard</h1>
      </section>
    </main>
  );
}
