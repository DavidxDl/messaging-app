import { SignOutButton } from "@clerk/nextjs";
import { User, auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import Link from "next/link";
import Avatar from "~/components/Avatar";

export default async function HomePage() {
  const { userId } = auth();
  let username = " ";
  let friends;
  let user: User | null = null;
  if (userId) {
    user = await currentUser();


    if (user?.username)
      username = user.username;

    const userExist = await db.user.findUnique({ where: { username: username } });
    console.log(userExist)

    if (userExist === null) {
      await db.user.create({ data: { id: userId, username: username } })
    } else {
      friends = await db.friendship.findMany({ where: { friendOfId: userId }, select: { friends: true } })
      console.log(friends)
    }

  }

  return (
    <main >

      {!userId && <Link href="/sign-in">Sign in</Link>}
      {
        !!userId && (
          <>
            <div className="flex gap-2 items-center">
              <h1>Welcome {username}!</h1>
              <Avatar imageURl={user?.imageUrl!} />

            </div>
            <h2>Friends</h2>
            <ul>{friends?.map(f => <li key={f.friends.id}><Link className="hover:font-extrabold text-white" href={`/friends/${f.friends.id}`}>{f.friends.username}</Link></li>)}</ul>
            <div className="flex gap-4">
              <SignOutButton >↗ Sign out </SignOutButton>
              <Link href="/user-profile">👤 Account</Link>
            </div>

          </>
        )
      }

    </main >
  );
}
