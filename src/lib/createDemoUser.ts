"use server";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const createDemoUser = async () => {
  if (
    !process.env.NEXT_PUBLIC_DEMO_USERNAME ||
    !process.env.NEXT_PUBLIC_DEMO_PASSWORD
  ) {
    throw new Error("Missing en variables");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(
    process.env.NEXT_PUBLIC_DEMO_PASSWORD,
    salt
  );
  await prisma.user.create({
    data: {
      email: process.env.NEXT_PUBLIC_DEMO_USERNAME,
      password: hashedPassword,
    },
  });
};
