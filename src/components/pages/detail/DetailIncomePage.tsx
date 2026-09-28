import { useNavigate, useParams } from "react-router-dom";
import useGetItemById from "../../../hooks/useGetItemById";
import SideBarLayout from "../../layout/sidebar-layout";
import { useDelete } from "../../../hooks/useDelete";
import IncomeUpdateForm from "../../layout/update-form/income";
import type { IncomeType } from "../../../types/IncomeType";

export default function DetailOutcomePage() {
  const endpoint = "/income/";
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetItemById<IncomeType>({ id, endpoint });
  const { executeDelete, isLoading: isLoadingDelete } = useDelete();
  const navigate = useNavigate();

  async function handleDelete(itemId?: string) {
    const isConfirm = window.confirm("Are you sure delete this item?");
    if (isConfirm) {
      try {
        await executeDelete(`/income/${itemId}`);
        navigate("/income");
      } catch (error) {
        console.error("Failed delete item: ", error);
      }
    }
  }

  return (
    <main className="flex">
      <SideBarLayout />
      {loading ? (
        <section className="w-full p-10 flex justify-center text-gray-500">
          Loading...
        </section>
      ) : !data ? (
        <section className="w-full p-10 flex justify-center text-red-500">
          Data pengeluaran tidak ditemukan.
        </section>
      ) : (
        <IncomeUpdateForm
          data={data}
          id={id as string}
          handleDelete={handleDelete}
          isLoadingDelete={isLoadingDelete}
        />
      )}
    </main>
  );
}
