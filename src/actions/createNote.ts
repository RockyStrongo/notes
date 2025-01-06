"use server";

import { fetchUser, getCurrentUserId } from "@/app/login/actions";
import prisma from "@/db";

export const createNote = async (body: { title: string; content: string }) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("UserId not found");
  }

  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      userId: userId,
    },
  });
};
