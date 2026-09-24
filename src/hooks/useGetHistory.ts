import { useEffect, useState } from "react";
import type { OutcomeType } from "../types/OutcomeType";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";
import type { PaginationType } from "../types/PaginationType";

export default function useGetOutcomeHistory(
  page: number = 1,
  limit: number = 10,
) {
  const [outcome, setOutcome] = useState<OutcomeType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: limit,
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchOutcomeHistories() {
      try {
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
      }
    }
    fetchOutcomeHistories();
  }, [token, page, limit]);

  return { outcome, pagination };
}
