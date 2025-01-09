"use server";
import { fetchUser, getCurrentUserId } from "@/app/login/actions";
import prisma from "@/db";

export const deleteNote = async (id: string) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error("UserId not found");
  }

  const user = await fetchUser(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const note = await prisma.note.findFirst({
    where: {
      id: id,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  if (note.userId != userId) {
    throw new Error("Not authorized");
  }

  return await prisma.note.delete({
    where: {
      id: id,
    },
  });
};
