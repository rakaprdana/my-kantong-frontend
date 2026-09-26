import { useState } from "react";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";

export function useDelete() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function executeDelete(endpoint: string) {
    setIsLoading(true);
    try {
      return await api.delete(`${API_URL}${endpoint}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Terjadi kesalahan saat menghapus data");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return { executeDelete, isLoading };
}
