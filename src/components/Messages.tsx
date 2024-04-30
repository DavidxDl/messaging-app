'use client';
import { useEffect, useRef, useState } from "react";
import { Message } from "~/lib/modelTypes";

interface Props {
  userId: string;
  destineId: string;
  shouldRefresh: boolean;
}

export default function Messages({ userId, destineId, shouldRefresh }: Props) {
  const [messages, setMessages] = useState<Message[]>()
  const container = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    async function getMessages() {
      const res = await fetch(`/api/friends/${destineId}/messages`);
      const mgs: Message[] = await res.json() as Message[];
      setMessages(mgs);
    }
    getMessages().catch(err => console.error(err));
  }, [shouldRefresh])

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
      console.log('am scrolling jiggles*')
    }
  }, [shouldRefresh])
  return (
    <div ref={container} className=" pb-2 px-0.5 rounded-t bg-white w-96 h-96 overflow-auto">
      <ul className=' border-b gap-1  text-black flex flex-col  '>
        {messages?.map(m => (
          <li key={m.id} className={`bg-gradient-to-tr from-red-600 to-sky-600 text-white rounded p-1 flex justify-end self-start ${m.authorId === userId && 'self-end'}`}>
            {m.message}
          </li>))
        }
      </ul>
    </div>
  )
}

