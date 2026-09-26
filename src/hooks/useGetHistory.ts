import { useEffect, useState } from "react";
import type { OutcomeType } from "../types/OutcomeType";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";
import type { PaginationType } from "../types/PaginationType";
import type { IncomeType } from "../types/IncomeType";

export function useGetOutcomeHistory(page: number = 1, limit: number = 10) {
  const [outcome, setOutcome] = useState<OutcomeType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: limit,
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchOutcomeHistories() {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/outcome`, {
        params: { page, limit },
      });
      const { items, currentPage, totalPages, totalItems, pageSize } =
        response.data.data;
      setOutcome(items);
      setPagination({ currentPage, totalPages, totalItems, pageSize });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOutcomeHistories();
  }, [page, limit]);

  return { outcome, pagination, loading, refetch: fetchOutcomeHistories };
}

export function useGetIncomeHistory(page: number = 1, limit: number = 10) {
  const [income, setIncome] = useState<IncomeType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: limit,
  });
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchIncomeHistories() {
    try {
      setLoading(true);
      const response = await api.get(`${API_URL}/income`, {
        params: { page, limit },
      });
      const { items, currentPage, totalPages, totalItems, pageSize } =
        response.data.data;
      setIncome(items);
      setPagination({ currentPage, totalPages, totalItems, pageSize });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIncomeHistories();
  }, [page, limit]);

  return { income, pagination, loading, refetch: fetchIncomeHistories };
}
