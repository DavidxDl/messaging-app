import { RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import { redirect } from 'next/navigation';
import Chat from '~/components/Chat';
import { db } from '~/server/db';


export default async function page({ params }: { params: { friendId: string } }) {
  const { userId } = auth()
  if (!userId)
    <RedirectToSignIn />

  const friend: User | null = await db.user.findUnique({ where: { id: params.friendId } })
  if (friend === null)
    return redirect('/');


  return (
    <main>
      {!!friend && <h1 className='text-2xl font-extrabold'>{friend.username}</h1>}
      <Chat userId={userId!} destineId={params.friendId} friend={friend} />
    </main>
  )
}



