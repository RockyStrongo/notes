"use client";
import { Note } from "@prisma/client";
import { useState } from "react";
import CreateNote from "../CreateNote/CreateNote";
import EditNote from "../EditNote/EditNote";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { deleteNote } from "@/actions/deleteNote";
import { useRouter } from "next/navigation";

interface IHomeProps {
  notes: Note[];
}

export default function Home({ notes }: IHomeProps) {
  const router = useRouter();

  const [openNote, setOpenNote] = useState<Note | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    itemLabel: string;
    id: string;
  } | null>(null);

  const handleDelete =
    (id: string, label: string) =>
    (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteConfirmation({
        itemLabel: label,
        id: id,
      });
    };

  const handleDeleteConfirmed = async () => {
    if (!deleteConfirmation) {
      throw new Error();
    }
    await deleteNote(deleteConfirmation.id);
    setDeleteConfirmation(null);
    router.refresh();
  };

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      <div className="overflow-y-auto p-5 md:p-10 flex grow flex-col gap-4 items-center">
        {notes.length > 0 ? (
          notes.map((note) => (
            <button
              key={note.id}
              className="w-full p-2 bg-white hover:bg-gray-50 shadow-lg rounded-lg grid grid-cols-[1fr_auto] max-w-[70rem]"
              onClick={() => setOpenNote(note)}
            >
              <div className="flex flex-col items-start">
                {note.title}
                <span className="text-xs text-gray-500">
                  {note.updatedAt
                    ? note.updatedAt.toLocaleDateString()
                    : note.createdAt.toLocaleDateString()}
                </span>
              </div>
              <div className="pr-5 h-full flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 hover:text-gray-600"
                  viewBox="0 0 448 512"
                  onClick={handleDelete(note.id, note.title)}
                >
                  {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                  <path
                    fill="CurrentColor"
                    d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                  />
                </svg>
              </div>
            </button>
          ))
        ) : (
          <p>No notes yet</p>
        )}
      </div>
      <EditNote
        note={openNote}
        open={openNote != null}
        onclose={() => setOpenNote(null)}
      />
      <div className="w-full flex justify-center p-4">
        <CreateNote />
      </div>
      <DeleteConfirmation
        itemLabel={deleteConfirmation ? deleteConfirmation.itemLabel : ""}
        open={deleteConfirmation != null}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteConfirmation(null)}
      />
    </div>
  );
}
