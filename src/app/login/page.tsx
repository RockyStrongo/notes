"use client";

import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "./actions";

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
    let loginSuccessful = await login({
      email: email.toString(),
      password: password.toString(),
    });

    if (!loginSuccessful) {
      setError("Invalid credentials");
    }

    if (loginSuccessful) {
      redirect("/");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <button type="submit">LOGIN</button>
        {error && <p>Error : {error} </p>}
      </form>
    </>
  );
}
