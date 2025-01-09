import { createDemoUser } from "@/lib/createDemoUser";

export default function page() {
  return (
    <button onClick={createDemoUser} type="button">
      Create Demo User
    </button>
  );
}
