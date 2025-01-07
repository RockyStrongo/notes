"use client";

import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function page() {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      setError("All fields required");
      return;
    }
    let loginSuccessful = false;
    try {
      loginSuccessful = await login({
        email: email.toString(),
        password: password.toString(),
      });
    } catch (error) {
      setError("Invalid credentials");
      return;
    }

    if (!loginSuccessful) {
      setError("Invalid credentials");
    }

    if (loginSuccessful) {
      redirect("/");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form className="w-96 flex flex-col gap-3 m-5" onSubmit={handleLogin}>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          autoComplete="off"
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="off"
        />
        <Button type="submit">LOGIN</Button>
        <div className="h-20">{error && <p>Error : {error} </p>}</div>
      </form>
    </div>
  );
}
