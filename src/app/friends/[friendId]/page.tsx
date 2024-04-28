
import { auth } from '@clerk/nextjs/server';
import Chat from '~/components/Chat';
import MessageInput from '~/components/MessageInput';


export default async function page({ params }: { params: { friendId: string } }) {
  const { userId } = auth()

  return (
    <main>
      <Chat userId={userId!} destineId={params.friendId} />
    </main>
  )
}



