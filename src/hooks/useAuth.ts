import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { SignInType, SignUpType } from "../interfaces/form-data";
import api, { API_URL } from "../service/api";

export const useAuthUser = () => {
  const navigate = useNavigate();

  const signUp = async (
    formData: SignUpType,
    login: (token: string) => void,
  ) => {
    try {
      const response = await api.post(`${API_URL}/auth/register`, formData);
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        login(response.data.data.token);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        alert(error.response?.data?.message || "SignUp failed");
      }
    }
  };
  const signIn = async (
    formData: SignInType,
    login: (token: string) => void,
  ) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, formData);
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        login(response.data.data.token);
        navigate("/dashboard");
      } else {
        alert("Format respons tidak valid: Token tidak ditemukan.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.errors ||
          "SignIn Failed";
        alert(errorMessage);
      } else {
        alert("Sistem error");
      }

      throw error;
    }
  };

  return { signUp, signIn };
};
