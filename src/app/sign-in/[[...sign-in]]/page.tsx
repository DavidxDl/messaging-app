import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="h-svh flex items-center justify-center bg-zinc-950">
      <SignIn path="/sign-in" />
    </main>
  );
}
