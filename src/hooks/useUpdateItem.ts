import React, { useState, type ChangeEvent } from "react";
import useStatus from "./useStatus";
import type { UpdateItemProps } from "../types/UpdateItemType";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";

export default function useUpdateItem<T>({
  id,
  endpoint,
  initialData,
  amountField,
  editableFields,
  onSuccess,
}: UpdateItemProps<T>) {
  const [formUpdate, setFormUpdate] = useState<T>(initialData);
  const { callStatusAndMessage, status, message } = useStatus();

  function handleUpdateChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setFormUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleCurrencyChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const rawValue = value.replace(/\D/g, "");
    const formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "");
    setFormUpdate((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  }

  async function handleSubmitUpdateData(e: React.FormEvent) {
    e.preventDefault();
    callStatusAndMessage("loading", "");
    try {
      const payload: Record<string, unknown> = {};
      for (const key of editableFields) {
        payload[key as string] = formUpdate[key];
      }

      payload[amountField as string] = Number(formUpdate[amountField]);

      await api.put(`${API_URL}${endpoint}/${id}`, payload);
      callStatusAndMessage("success", "Data has been updated");
      onSuccess?.();
    } catch (error) {
      if (error instanceof AxiosError) {
        callStatusAndMessage("error", error);
      } else {
        callStatusAndMessage("error", "Unexpected error occured");
      }
    }
  }

  return {
    formUpdate,
    handleUpdateChange,
    handleCurrencyChange,
    handleSubmitUpdateData,
    status,
    message,
  };
}
