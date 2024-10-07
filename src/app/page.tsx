import { RedirectToSignIn } from "@clerk/nextjs";
import { User, auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import Avatar from "~/components/Avatar";
import Status from "~/components/Status";
import SearchBar from "~/components/SearchBar";
import FriendList from "~/components/FriendList";
import UserStatus from "~/components/UserStatus";
import PhraseBtn from "~/components/PhraseBtn";

export default async function HomePage() {
  const { userId } = auth();
  let username = " ";
  let imageUrl = ""
  let friends;
  let friendOf;
  let user: User | null = null;
  if (userId) {
    user = await currentUser();


    if (!user)
      return <RedirectToSignIn />

    if (user.username)
      username = user.username;
    else
      username = user.fullName!
    if (user?.imageUrl)
      imageUrl = user.imageUrl

    let userExist = await db.user.findUnique({ where: { username: username } });
    console.log(userExist)

    if (userExist === null) {
      userExist = await db.user.create({ data: { id: userId, username: username, imgUrl: imageUrl } })
    } else {
      friends = await db.friendship.findMany({ where: { friendOfId: userId }, select: { friends: true }, orderBy: { friends: { status: "desc" } } })
      friendOf = await db.friendship.findMany({ where: { friendId: userId }, select: { friendOf: true } })
      console.log(friends)
    }



    //s
    return (
      <main className="gap-2">

        {friends && <SearchBar friends={friends} userId={userId} />}
        <div className="flex flex-col items-center bg-slate-950 rounded-xl p-3 max-h-[44rem] md:max-h-[28rem] md:min-w-[70%] grow">

          <div className="flex gap-3 ">
            <Avatar imageUrl={user.imageUrl} className="min-w-20 grow" />
            <div className="flex flex-col">
              {!!userExist.phrase && <span className="text-xl font-extrabold">{userExist.phrase}</span>}
              <span className="">@{username} <UserStatus id={userId} status={userExist.status} /> </span>
              <PhraseBtn id={userId} />
            </div>
          </div>
          <hr className="w-full m-4" />
          {friends && <FriendList friends={friends} />}
        </div>
      </main >
    );
  }
}

/*
          <div className="flex gap-4 ">
            <SignOutButton >↗ Sign out </SignOutButton>
            <Link href="/user-profile">👤 Account</Link>
          </div>
*/

/*
          <h2>Friend Of</h2>
          <ul>{friendOf?.map(f =>
            <li key={f.friendOf.id}>
              <Link className="flex gap-2 hover:font-extrabold text-white" href={`/friends/${f.friendOf.id}`}>
                <Avatar imageUrl={f.friendOf.imgUrl} />
                {f.friendOf.username}

              </Link></li>)}
          </ul>
*/

