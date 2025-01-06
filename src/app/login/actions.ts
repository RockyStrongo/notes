"use server";
import prisma from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TJwt = {
  id: string;
  iat: number;
};

export const fetchUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }
  return user;
};

export const login = async (body: { email: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    throw new Error("Not authorized");
  }

  const isMatch = await bcrypt.compare(body.password, user.password);

  if (!isMatch) {
    throw new Error("Not authorized");
  }

  const JWT_SECRET = process.env.JWT_SECRET ?? "secret";

  const tokenPayload = {
    id: user.id,
  };
  const token = jwt.sign(tokenPayload, JWT_SECRET);

  const cookieStore = await cookies();

  cookieStore.set("usr", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    // expires: Date.now() + 60000,
  });

  return true;
};

export const logout = async () => {
  (await cookies()).delete("usr");
  redirect("/");
};

export const getCurrentUserId = async () => {
  if (!process.env.JWT_SECRET) {
    return;
  }
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("usr");

  if (!userCookie) {
    throw new Error("Not connected");
  }

  try {
    const decoded = jwt.verify(
      userCookie.value,
      process.env.JWT_SECRET
    ) as TJwt;
    const now = Date.now();
    if (decoded.iat * 1000 > now) {
      throw new Error("Not connected");
    }

    return decoded.id;
  } catch (error) {
    throw new Error("Not connected");
  }
};
