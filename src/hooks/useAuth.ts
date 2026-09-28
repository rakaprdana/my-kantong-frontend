import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import type { SignInType, SignUpType } from "../types/FormDataType";
import api, { API_URL } from "../service/api";

export const useAuthUser = () => {
  const navigate = useNavigate();

  const signUp = async (formData: SignUpType, login: () => void) => {
    try {
      const response = await api.post(`${API_URL}/auth/register`, formData);
      if (response.status === 201 || response.data.success) {
        login();
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        alert(error.response?.data?.message || "SignUp failed");
      }
    }
  };

  const signIn = async (formData: SignInType, login: () => void) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, formData);
      if (response.status === 200 || response.data.success) {
        login();
        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
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
