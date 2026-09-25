import { useEffect, useState } from "react";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";
import type { MonthlyOutcomeItem } from "../types/OutcomeType";

export function useMonthlyChart({
  year = new Date().getFullYear(),
}: {
  year?: number;
}) {
  const [chartData, setChartData] = useState<MonthlyOutcomeItem[]>([]);
  const [insight, setInsight] = useState<string>("");
  const [insightError, setInsightError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let isMounted = true;
    async function fetchChartData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(
          `${API_URL}/gemini/insight/monthly?year=${year}`,
        );
        if (isMounted) {
          setChartData(response.data.data.chartData);
          setInsight(response.data.data.insight);
          setInsightError(response.data.data.insightError);
        }
      } catch (error) {
        if (isMounted) {
          const message =
            error instanceof AxiosError
              ? error.response?.data?.message || "Failed catch data chart"
              : "System error";
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchChartData();

    // cleanup function for preventing memory leaks
    return () => {
      isMounted = false;
    };
  }, [year]);

  return { chartData, insight, isLoading, error, insightError };
}
