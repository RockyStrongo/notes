"use server";

import { getCurrentUserId } from "@/app/login/actions";
import prisma from "@/db";

export const fetchNotes = async () => {
  const userId = await getCurrentUserId();
  const notes = await prisma.note.findMany({
    where: {
      userId: userId,
    },
  });

  return notes.sort((a, b) => {
    let aDate;
    let bDate;
    if (a.updatedAt) {
      aDate = a.updatedAt.getTime();
    } else {
      aDate = a.createdAt.getTime();
    }
    if (b.updatedAt) {
      bDate = b.updatedAt.getTime();
    } else {
      bDate = b.createdAt.getTime();
    }
    return bDate - aDate;
  });
};
