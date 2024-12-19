import { fetchNotes } from "@/actions/fetchNotes";
import CreateNote from "@/components/CreateNote/CreateNote";

export default async function Home() {
  const notes = await fetchNotes();

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto]">
      <div className="overflow-y-auto p-5 flex grow">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div>
              {note.title} - {note.createdAt.toLocaleDateString()}
            </div>
          ))
        ) : (
          <p>No notes yet</p>
        )}
      </div>
      <div className="w-full flex justify-center p-4">
        <CreateNote />
      </div>
    </div>
  );
}
