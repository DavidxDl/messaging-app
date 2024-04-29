'use client';
import { useEffect, useState } from "react";
import { Message } from "~/lib/modelTypes";

interface Props {
  userId: string;
  destineId: string;
  shouldRefresh: boolean;
}

export default function Messages({ userId, destineId, shouldRefresh }: Props) {
  const [messages, setMessages] = useState<Message[]>()

  useEffect(() => {
    async function getMessages() {
      const res = await fetch(`/api/friends/${destineId}/messages`);
      const mgs: Message[] = await res.json() as Message[];
      setMessages(mgs);
    }
    getMessages().catch(err => console.error(err));
  }, [shouldRefresh])
  return (
    <div className='pb-2 rounded-t bg-white w-96 h-96 border-b '>
      <ul className='gap-1 overflow-y-scroll text-black flex flex-col justify-end h-full'>
        {messages?.map(m => (
          <li key={m.id} className={`bg-gradient-to-tr from-red-600 to-sky-600 text-white rounded p-1 flex justify-end ${m.authorId === userId && 'self-end'}`}>
            {m.message}
          </li>))
        }
      </ul>
    </div>
  )
}

