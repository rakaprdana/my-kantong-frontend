import { useNavigate } from "react-router-dom";
import { Button } from "../../../../@/components/ui/button";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../../../../@/components/ui/card";
import { Input } from "../../../../@/components/ui/input";
import { Label } from "../../../../@/components/ui/label";
import { Textarea } from "../../../../@/components/ui/textarea";
import useUpdateItem from "../../../hooks/useUpdateItem";
import type { IncomeType } from "../../../types/IncomeType";

export default function IncomeUpdateForm({
  data,
  id,
  handleDelete,
  isLoadingDelete,
}: {
  data: IncomeType;
  id: string;
  handleDelete: (id?: string) => void;
  isLoadingDelete: boolean;
}) {
  const navigate = useNavigate();
  const {
    formUpdate,
    handleUpdateChange,
    handleCurrencyChange,
    handleSubmitUpdateData,
    status,
    message,
  } = useUpdateItem<IncomeType>({
    id,
    endpoint: "/income",
    initialData: data,
    amountField: "income",
    editableFields: ["income", "information"],
    onSuccess: () => {
      navigate(`/detail/income/${id}`);
    },
  });

  return (
    <Card className="border border-red-400 w-full m-8 shadow-lg flex flex-col">
      {status === "success" && (
        <CardDescription className="text-center text-incomeColor">
          {message}
        </CardDescription>
      )}
      {status === "error" && (
        <CardDescription className="text-center text-incomeColor">
          {message}
        </CardDescription>
      )}
      <CardTitle className="flex items-center font-bold text-2xl text-destructive p-4">
        <Button
          className="bg-transparent hover:bg-white text-black text-5xl mr-4"
          onClick={() => navigate("/income")}
        >
          ←
        </Button>
        {new Date(data.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </CardTitle>
      <CardContent className="p-6 space-y-3 grow">
        <form id="update-form" onSubmit={handleSubmitUpdateData}>
          <div className="flex justify-between items-center my-4">
            <Label htmlFor="outcome" className="text-gray-600 font-medium">
              Outcome:
            </Label>
            <Input
              name="outcome"
              className="w-1/3"
              value={formUpdate.income || ""}
              onChange={handleCurrencyChange}
            />
          </div>
          <div>
            <Label htmlFor="information" className="text-gray-600 font-medium">
              Information:
            </Label>
            <Textarea
              name="information"
              className="mt-4"
              value={formUpdate.information || ""}
              onChange={handleUpdateChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-red-50 border-t border-red-200 p-4 flex justify-between mt-auto">
        <Button
          onClick={() => handleDelete(data._id)}
          variant="destructive"
          className="px-4 py-2 bg-red-500 hover:bg-destructive text-white rounded-md transition"
        >
          {isLoadingDelete ? "Deleting..." : "Delete"}
        </Button>
        <Button
          type="submit"
          form="update-form" // Menghubungkan tombol di luar form dengan form di atas
          className="px-4 py-2 bg-mainColor hover:bg-blue-700 text-white rounded-md transition"
        >
          {status === "loading" ? "Updating..." : "Update Item"}
        </Button>
      </CardFooter>
    </Card>
  );
}
