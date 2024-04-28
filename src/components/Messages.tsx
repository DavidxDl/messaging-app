'use client';
import { Message } from "@prisma/client";
import { useEffect, useState } from "react";

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
      const mgs = await res.json();
      setMessages(mgs);
    }
    getMessages()
  }, [shouldRefresh])
  return (
    <div className='bg-white w-96 h-96 border-b '>
      <ul className='overflow-y-scroll text-black flex flex-col justify-end h-full'>
        {messages?.map(m => <li className={`w-full flex ${m.authorId === userId && 'justify-end'}`}>{m.author.username! + ": " + m.message}</li>)}
      </ul>
    </div>
  )
}

