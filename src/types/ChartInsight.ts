export type ChartInsightResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: {
    chartData: T[];
    insight: string;
  };
};
