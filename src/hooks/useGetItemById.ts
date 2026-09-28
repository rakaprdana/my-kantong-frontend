import { useEffect, useState } from "react";
import api, { API_URL } from "../service/api";
import { AxiosError } from "axios";

export default function useGetItemById<T>({
  id,
  endpoint,
}: {
  id: string | undefined;
  endpoint: string;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (!id) return;
    async function fetchOutcomeById() {
      try {
        setLoading(true);
        const response = await api.get(`${API_URL}${endpoint}${id}`);
        setData(response.data.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.error) {
          alert(error.response.data.error);
        } else {
          alert("Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchOutcomeById();
  }, [id, endpoint]);

  return { data, loading };
}
