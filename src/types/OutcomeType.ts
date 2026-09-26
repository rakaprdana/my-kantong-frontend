export type OutcomeType = {
  _id?: string;
  date: string;
  outcome: string | number;
  category: string;
  information: string;
  is_delete: boolean;
};

export type MonthlyOutcomeItem = {
  _id: number;
  total: number;
};

export type CategoryOutcomeItem = {
  _id: string;
  total: number;
};

export type MonthlyOutcomeChartProps = {
  // token: string;
  year: number;
};
