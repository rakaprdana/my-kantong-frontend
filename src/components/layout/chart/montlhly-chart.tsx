import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../@/components/ui/chart";
import { Skeleton } from "../../../../@/components/ui/skeleton";
import { useMonthlyChart } from "../../../hooks/useCharts";
import { MONTH_LABELS } from "../../../types/Labels";
import type { MonthlyOutcomeChartProps } from "../../../types/OutcomeType";
import { chartConfig } from "./chart-config";
import GeminiIcon from "../../../assets/vecteezy_gemini-google-icon-symbol-logo_55687065.png";

export default function MonthlyOutcomeChart({
  year = new Date().getFullYear(),
}: MonthlyOutcomeChartProps) {
  const { chartData, insight, insightError, isLoading, error } =
    useMonthlyChart({ year });
  const formattedData = chartData.map((item) => ({
    month: MONTH_LABELS[item._id - 1],
    total: item.total,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengeluaran Bulanan {year}</CardTitle>
        <CardDescription>
          Total pengeluaran per bulan dalam Rupiah
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={formattedData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey={"month"}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `${(value / 1000).toLocaleString("id-ID")}rb`
                  }
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        `RP${Number(value).toLocaleString("id-ID")}`
                      }
                    />
                  }
                />
                <Bar
                  dataKey={"total"}
                  fill="var(--color-mainColor)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
            {insight ? (
              <div className="mt-4 rounded-lg bg-muted p-3 text-sm">
                <span className="flex items-center font-medium">
                  {" "}
                  <img src={GeminiIcon} className="w-5 mr-4" /> Insight:{" "}
                </span>
                {insight}
              </div>
            ) : insightError ? (
              <div className="mt-4 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                ⚠️ {insightError}
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
