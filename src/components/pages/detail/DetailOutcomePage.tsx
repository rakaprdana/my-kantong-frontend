import { useNavigate, useParams } from "react-router-dom";
import useGetItemById from "../../../hooks/useGetItemById";
import type { OutcomeType } from "../../../types/OutcomeType";
import SideBarLayout from "../../layout/sidebar-layout";
import OutcomeUpdateForm from "../../layout/update-form/outcome";
import { useDelete } from "../../../hooks/useDelete";

export default function DetailOutcomePage() {
  const endpoint = "/outcome/";
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetItemById<OutcomeType>({ id, endpoint });
  const { executeDelete, isLoading: isLoadingDelete } = useDelete();
  const navigate = useNavigate();

  async function handleDelete(itemId?: string) {
    const isConfirm = window.confirm("Are you sure delete this item?");
    if (isConfirm) {
      try {
        await executeDelete(`/outcome/${itemId}`);
        navigate("/outcome");
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
        // Panggil Child Component di sini dan lewatkan data yang sudah berstatus 'ready'
        <OutcomeUpdateForm
          data={data}
          id={id as string}
          handleDelete={handleDelete}
          isLoadingDelete={isLoadingDelete}
        />
      )}
    </main>
  );
}
