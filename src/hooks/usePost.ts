import React, { useState, type ChangeEvent } from "react";
import type { OutcomeType } from "../types/OutcomeType";
import { AxiosError } from "axios";
import api, { API_URL } from "../service/api";
import useStatus from "./useStatus";
import type { IncomeType } from "../types/IncomeType";

export function usePostOutcome(onSuccess?: () => void) {
  const [formOutcome, setFormOutcome] = useState<OutcomeType>({
    date: new Date().toISOString(),
    outcome: 0,
    category: "",
    information: "",
  });
  const { callStatusAndMessage, status, message } = useStatus();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormOutcome((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmitFormOutcome(e: React.FormEvent) {
    e.preventDefault();
    callStatusAndMessage("loading", "");
    try {
      await api.post(`${API_URL}/outcome`, formOutcome);
      setFormOutcome({
        date: new Date().toISOString(),
        outcome: 0,
        category: "",
        information: "",
      });
      callStatusAndMessage("success", "Data has been saved");
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        console.log(error.response?.data?.error);
        callStatusAndMessage("error", error);
      } else {
        console.error("An unexpected: ", error);
      }
    }
  }

  return {
    formOutcome,
    handleChange,
    handleSubmitFormOutcome,
    status,
    message,
  };
}

export function usePostIncome(onSuccess?: () => void) {
  const [formIncome, setFormIncome] = useState<IncomeType>({
    date: new Date().toISOString(),
    income: 0,
    information: "",
  });
  const { callStatusAndMessage, status, message } = useStatus();

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormIncome((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmitFormIncome(e: React.FormEvent) {
    e.preventDefault();
    callStatusAndMessage("loading", "");
    try {
      await api.post(`${API_URL}/income`, formIncome);
      setFormIncome({
        date: new Date().toISOString(),
        income: 0,
        information: "",
      });
      callStatusAndMessage("success", "Data has been saved");
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        console.log(error.response?.data?.error);
        callStatusAndMessage("error", error);
      } else {
        console.error("An unexpected: ", error);
      }
    }
  }

  return {
    formIncome,
    handleChange,
    handleSubmitFormIncome,
    status,
    message,
  };
}
