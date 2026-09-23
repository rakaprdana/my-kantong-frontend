import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { SignInType, SignUpType } from "../interfaces/form-data";

export const API = import.meta.env.VITE_API_BASE_URL;

export const useAuthUser = () => {
  const navigate = useNavigate();

  const signUp = async (
    formData: SignUpType,
    login: (token: string) => void,
  ) => {
    try {
      const response = await axios.post(`${API}/auth/register`, formData);
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
      const response = await axios.post(`${API}/auth/login`, formData);
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
