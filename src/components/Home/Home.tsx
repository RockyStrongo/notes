"use client";
import { Note } from "@prisma/client";
import { useState } from "react";
import CreateNote from "../CreateNote/CreateNote";
import EditNote from "../EditNote/EditNote";

interface IHomeProps {
  notes: Note[];
}

export default function Home({ notes }: IHomeProps) {
  const [openNote, setOpenNote] = useState<Note | null>(null);

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      <div className="overflow-y-auto p-5 flex grow flex-col gap-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="w-full p-2 bg-white shadow-lg rounded-lg"
              onClick={() => setOpenNote(note)}
            >
              {note.title} - {note.createdAt.toLocaleDateString()}
            </div>
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
      {JSON.stringify(openNote)}
    </div>
  );
}
