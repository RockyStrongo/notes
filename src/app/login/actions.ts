"use server";
import prisma from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    expires: Date.now() + 300000,
  });

  return true;
};
