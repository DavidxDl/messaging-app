import { SignOutButton } from "@clerk/nextjs";
import { User, auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import Link from "next/link";
import Avatar from "~/components/Avatar";

export default async function HomePage() {
  const { userId } = auth();
  let username = " ";
  let imageUrl = ""
  let friends;
  let friendOf;
  let user: User | null = null;
  if (userId) {
    user = await currentUser();


    if (user?.username)
      username = user.username;
    if (user?.imageUrl)
      imageUrl = user.imageUrl

    const userExist = await db.user.findUnique({ where: { username: username } });
    console.log(userExist)

    if (userExist === null) {
      await db.user.create({ data: { id: userId, username: username, imgUrl: imageUrl } })
    } else {
      friends = await db.friendship.findMany({ where: { friendOfId: userId }, select: { friends: true } })
      friendOf = await db.friendship.findMany({ where: { friendId: userId }, select: { friendOf: true } })
      console.log(friends)
    }



    //s
    return (
      <main >

        {!userId && <Link href="/sign-in">Sign in</Link>}
        {
          !!userId && (
            <>
              <div className="flex gap-2 items-center">
                <h1>Welcome {username}!</h1>
                <Avatar imageUrl={imageUrl} />

              </div>
              <h2>Friends</h2>
              <ul>{friends?.map(f => <li key={f.friends.id}><Link className="hover:font-extrabold text-white" href={`/friends/${f.friends.id}`}>{f.friends.username}</Link></li>)}</ul>
              <h2>Friend Of</h2>
              <ul>{friendOf?.map(f => <li key={f.friendOf.id}><Link className="hover:font-extrabold text-white" href={`/friends/${f.friendOf.id}`}>{f.friendOf.username}</Link></li>)}</ul>
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
}
