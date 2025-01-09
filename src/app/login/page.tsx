"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "./actions";
import { createDemoUser } from "@/lib/createDemoUser";

export default function page() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      setError("All fields required");
      return;
    }

    await handleLogin(email.toString(), password.toString());
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    let loginSuccessful = false;
    try {
      loginSuccessful = await login({
        email: email,
        password: password,
      });
    } catch (error) {
      setError(`${error}`);
      return;
    } finally {
      setLoading(false);
    }

    if (!loginSuccessful) {
      setError("Invalid credentials");
    }

    if (loginSuccessful) {
      redirect("/");
    }

    setLoading(false);
  };

  const useDemoUser = () => {
    if (
      !process.env.NEXT_PUBLIC_DEMO_USERNAME ||
      !process.env.NEXT_PUBLIC_DEMO_PASSWORD
    ) {
      throw new Error("Missing en variables");
    }
    handleLogin(
      process.env.NEXT_PUBLIC_DEMO_USERNAME,
      process.env.NEXT_PUBLIC_DEMO_PASSWORD
    );
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form className="w-96 flex flex-col gap-3 m-5" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autoComplete="off"
        />
        <Button disabled={loading} type="submit">
          LOGIN
        </Button>
        <button onClick={useDemoUser} className="text-xs w-full" type="button">
          Use demo user
        </button>
        <div className="h-20">{error && <p>Error : {error} </p>}</div>
      </form>
    </div>
  );
}
