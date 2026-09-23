import { useEffect, useState } from "react";
import api from "../service/api";
import { API } from "./useAuth";
import { AxiosError } from "axios";

export function useGetIncomeTotal() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDataTotal() {
      try {
        const responses = await api.get(`${API}/income/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomeTotal(responses.data.data.total);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.errors) {
          alert(error.response?.data?.message || "Error fetchin data");
        }
      }
    }
    fetchDataTotal();
  }, [token]);

  return { incomeTotal };
}

export function useGetOutcomeTotal() {
  const [outcomeTotal, setOutcomeTotal] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchDataTotal() {
      try {
        const responses = await api.get(`${API}/outcome/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOutcomeTotal(responses.data.data.total);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.errors) {
          alert(error.response?.data?.message || "Error fetchin data");
        }
      }
    }
    fetchDataTotal();
  }, [token]);

  return { outcomeTotal };
}
