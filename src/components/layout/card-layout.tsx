import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";

export default function CardLayout({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  const isIncome = title.toLowerCase().includes("income");
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={`text-xl ${isIncome ? "text-incomeColor" : "text-outcomeColor"}`}
        >
          {title}
        </CardTitle>
        <CardContent>
          <p className=" text-lg">{amount}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
