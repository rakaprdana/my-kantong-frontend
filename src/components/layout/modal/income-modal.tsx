import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Label } from "../../../../@/components/ui/label";
import { Button } from "../../../../@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../../../../@/components/ui/card";
import type { ModalType } from "../../../types/ModalType";
import { usePostIncome } from "../../../hooks/usePost";

export default function IncomeModal({
  canShow,
  onClose,
  onSuccess,
}: ModalType) {
  const { formIncome, handleChange, handleSubmitFormIncome, status, message } =
    usePostIncome(onSuccess);
  if (!canShow) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmitFormIncome}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
    >
      <Card className="relative w-[600px]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <CardHeader>
          <CardTitle className="text-center">Income Form</CardTitle>
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
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Label className="mb-4" htmlFor="date">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formIncome.date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="mb-4" htmlFor="income">
                  Income
                </Label>
                <Input
                  id="income"
                  name="income"
                  type="number"
                  required
                  value={formIncome.income}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Label className="mb-4" htmlFor="description">
                Information
              </Label>
              <Textarea
                id="information"
                name="information"
                rows={4}
                value={formIncome.information}
                onChange={handleChange}
              />
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            className="bg-mainColor hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
