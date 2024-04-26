import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = auth();
  let username: string = "";
  if (userId) {
    const user = await currentUser();
    if (user?.username)
      username = user.username;
    const userExist = await db.user.findUnique({ where: { username: username } });
    console.log(userExist)
    if (userExist === null) {
      await db.user.create({ data: { id: userId, username: username } })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">

      {!userId && <Link href="/sign-in">Sign in</Link>}
      {
        !!userId && (
          <>
            <h1>Welcome {username}! </h1>
            <h2>Posts</h2>
            <SignOutButton />

          </>
        )
      }

    </main >
  );
}
