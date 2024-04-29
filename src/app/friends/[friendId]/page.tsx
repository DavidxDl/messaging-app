
import { RedirectToSignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { User } from '@prisma/client';
import Chat from '~/components/Chat';
import MessageInput from '~/components/MessageInput';
import { db } from '~/server/db';


export default async function page({ params }: { params: { friendId: string } }) {
  const { userId } = auth()
  if (!userId)
    <RedirectToSignIn />

  const friend: User | null = await db.user.findUnique({ where: { id: params.friendId } })

  return (
    <main>
      {!!friend && <h1 className='text-2xl font-extrabold'>{friend.username}</h1>}
      <Chat userId={userId!} destineId={params.friendId} />
    </main>
  )
}



