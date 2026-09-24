import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { useState, type ChangeEvent } from "react";
import type { SignUpType } from "../../types/FormDataType";
import { AxiosError } from "axios";
import { useAuthUser } from "../../hooks/useAuth";
import { useAuth } from "../../hooks/useAuthContext";

export function RegisterPage() {
  const [formRegister, setFormRegister] = useState<SignUpType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useAuth();
  const { signUp } = useAuthUser();
  const navigate = useNavigate();

  function handleChangeFormRegister(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormRegister((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmitFormRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!formRegister.username || !formRegister.password) {
      setErrors(["Username and Password are required"]);
      return;
    }

    try {
      await signUp(formRegister, login);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.error) {
        setErrors([error.response.data.error || "Register failed"]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  }

  return (
    <main className="flex flex-col justify-center items-center py-28">
      <section className="flex flex-col justify-center items-center p-8">
        <h1 className="text-2xl font-bold text-mainColor">My Kantong</h1>
        <h2 className="font-bold p-4">Sign Up</h2>
      </section>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up for new account</CardTitle>

          {errors ? (
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          ) : (
            <CardDescription className="font-bold text-destructive text-xl">
              Errors
            </CardDescription>
          )}
          <CardAction>
            <Link to={"/"}>
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFormRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="user123"
                  required
                  onChange={handleChangeFormRegister}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChangeFormRegister}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full bg-mainColor">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
