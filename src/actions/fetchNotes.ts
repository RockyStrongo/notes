"use server";

import { getCurrentUserId } from "@/app/login/actions";
import prisma from "@/db";

export const fetchNotes = async () => {
  const userId = await getCurrentUserId();
  return await prisma.note.findMany({
    where: {
      userId: userId,
    },
  });
};
