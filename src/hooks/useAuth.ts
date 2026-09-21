import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { SignInType, SignUpType } from "../interfaces/form-data";

const API = import.meta.env.VITE_API_BASE_URL;

export const useAuthUser = () => {
  const navigate = useNavigate();

  const signUp = async (
    formData: SignUpType,
    login: (token: string) => void,
  ) => {
    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
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
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.token);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        alert(error.response?.data?.message || "SignIn failed");
      }
    }
  };

  return { signUp, signIn };
};
