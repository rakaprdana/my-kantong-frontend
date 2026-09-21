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
import { useAuthUser } from "../../hooks/useAuth";
import { useAuth } from "../../middlewares/AuthContext";
import { AxiosError } from "axios";

export function LoginPage() {
  const [formLogin, setFormLogin] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const { login } = useAuth();
  const { signIn } = useAuthUser();

  function handleChangeFormLogin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmitFormLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!formLogin.username || !formLogin.password) {
      setErrors(["Email and Password are required"]);
      return;
    }
    try {
      console.log("success");
      await signIn(formLogin, login);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError && error.response?.data.errors) {
        setErrors([error.response.data.errors || "Login failed"]);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  }

  return (
    <main className="flex flex-col justify-center items-center py-28">
      <section className="p-8">
        <h1 className="text-2xl font-bold text-blue-600">My Kantong</h1>
      </section>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in for your account</CardTitle>

          {errors ? (
            <CardDescription>
              Enter your username below to login to your account
            </CardDescription>
          ) : (
            <CardDescription className="font-bold text-red-500 text-xl">
              Errors
            </CardDescription>
          )}
          <CardAction>
            <Link to={"/register"}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitFormLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="user123"
                  required
                  onChange={handleChangeFormLogin}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handleChangeFormLogin}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full bg-blue-600">
                Sign In
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
