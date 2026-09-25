export type OutcomeType = {
  _id?: string;
  date: string;
  outcome: number;
  category: string;
  information: string;
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
