import React, { useState, type ChangeEvent } from "react";
import type { OutcomeType } from "../types/OutcomeType";
import { AxiosError } from "axios";
import api, { API_URL } from "../service/api";
import useStatus from "./useStatus";
import type { IncomeType } from "../types/IncomeType";

export function usePostOutcome(onSuccess?: () => void) {
  const [formOutcome, setFormOutcome] = useState<OutcomeType>({
    date: new Date().toISOString(),
    outcome: "",
    category: "",
    information: "",
    is_delete: false,
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

  function handleCurrencyChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const rawValue = value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFormOutcome((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  }

  async function handleSubmitFormOutcome(e: React.FormEvent) {
    e.preventDefault();
    callStatusAndMessage("loading", "");
    try {
      const rawOutcomeNumber = Number(
        String(formOutcome.outcome).replace(/\./g, ""),
      );
      const dataOutcomeToSend = {
        ...formOutcome,
        outcome: rawOutcomeNumber,
      };
      await api.post(`${API_URL}/outcome`, dataOutcomeToSend);
      setFormOutcome({
        date: new Date().toISOString(),
        outcome: "",
        category: "",
        information: "",
        is_delete: false,
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
    handleCurrencyChange,
    handleSubmitFormOutcome,
    status,
    message,
  };
}

export function usePostIncome(onSuccess?: () => void) {
  const [formIncome, setFormIncome] = useState<IncomeType>({
    date: new Date().toISOString(),
    income: "",
    information: "",
    is_delete: false,
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

  function handleCurrencyChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, "");

    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setFormIncome((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  }

  async function handleSubmitFormIncome(e: React.FormEvent) {
    e.preventDefault();
    callStatusAndMessage("loading", "");
    try {
      const rawIncomeNumber = Number(
        String(formIncome.income).replace(/\./g, ""),
      );
      const dataIncomeToSend = {
        ...formIncome,
        income: rawIncomeNumber,
      };
      await api.post(`${API_URL}/income`, dataIncomeToSend);
      setFormIncome({
        date: new Date().toISOString(),
        income: "",
        information: "",
        is_delete: false,
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
    handleCurrencyChange,
    status,
    message,
  };
}
