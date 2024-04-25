import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = auth();
  let username: string | null | undefined = "";
  if (userId) {
    const user = await currentUser();
    username = user?.username;

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

      {!userId && <Link href="/sign-in">Sign in</Link>}
      {
        !!userId && (
          <>
            <h1>Welcome {username}! </h1>
            <SignOutButton />

          </>
        )
      }

    </main >
  );
}
