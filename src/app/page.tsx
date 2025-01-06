import { fetchNotes } from "@/actions/fetchNotes";
import Home from "@/components/Home/Home";

export default async function HomePage() {
  const notes = await fetchNotes();

  return <Home notes={notes} />;
}
