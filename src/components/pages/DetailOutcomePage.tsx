import { useNavigate, useParams } from "react-router-dom";
import useGetItemById from "../../hooks/useGetItemById";
import type { OutcomeType } from "../../types/OutcomeType";
import SideBarLayout from "../layout/sidebar-layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../@/components/ui/card";
import { Button } from "../../../@/components/ui/button";
import { useDelete } from "../../hooks/useDelete";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";

export default function DetailOutcomePage() {
  const endpoint: string | undefined = "/outcome/";
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useGetItemById<OutcomeType>({ id, endpoint });
  const { executeDelete, isLoading } = useDelete();
  const navigate = useNavigate();

  async function handleDelete(id?: string) {
    const isConfirm = window.confirm("Are you sure delete this item ?");

    if (isConfirm) {
      try {
        await executeDelete(`/outcome/${id}`);
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
        <Card className="border border-red-400 w-full m-8 shadow-lg flex flex-col ">
          <CardTitle className="font-bold text-2xl text-destructive p-4">
            {new Date(data.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </CardTitle>
          <CardContent className="p-6 space-y-3 grow">
            <form>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Category:</span>
                <Input className="w-1/3" value={data.category} />
              </div>
              <div className="flex justify-between items-center my-4">
                <span className="text-gray-600 font-medium">Outcome:</span>
                <Input className="w-1/3" value={`Rp ${data.outcome}`} />
              </div>
              <div>
                <span className="text-gray-600 font-medium">Information:</span>
                <Textarea className="mt-4" value={data.information} />
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-red-50 border-t border-red-200 p-4 flex justify-end mt-auto">
            <Button
              onClick={() => handleDelete(data._id)}
              variant={"destructive"}
              className="px-4 py-2 bg-red-500 hover:bg-destructive text-white rounded-md transition"
            >
              {isLoading ? "Delete Item..." : "Delete"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
