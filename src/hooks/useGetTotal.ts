import { useEffect, useState } from "react";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";

export function useGetIncomeTotal() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const token = localStorage.getItem("token");

  async function fetchIncomeTotal() {
    try {
      const responses = await api.get(`${API_URL}/income/total`);
      setIncomeTotal(responses.data.data.total);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        alert(error.response?.data?.message || "Error fetchin data");
      }
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIncomeTotal();
  }, [token]);

  return { incomeTotal, refetch: fetchIncomeTotal };
}

export function useGetOutcomeTotal() {
  const [outcomeTotal, setOutcomeTotal] = useState(0);
  const token = localStorage.getItem("token");

  async function fetchOutcomeTotal() {
    try {
      const responses = await api.get(`${API_URL}/outcome/total`);
      setOutcomeTotal(responses.data.data.total);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.errors) {
        alert(error.response?.data?.message || "Error fetchin data");
      }
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOutcomeTotal();
  }, [token]);

  return { outcomeTotal, refetch: fetchOutcomeTotal };
}
