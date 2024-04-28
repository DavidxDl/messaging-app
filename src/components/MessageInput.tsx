"use client";

import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface Props {
  destineId: string
  authorId: string
  refresh: () => void;
}

export default function MessageInput({ destineId, authorId, refresh }: Props) {
  const [message, setMessage] = useState("");

  async function onSubmit(message: string) {
    const res = await fetch(`/api/friends/${destineId}`,
      {
        method: 'POST',
        body: JSON.stringify({ message, authorId, destineId }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    setMessage("")
    refresh();
  }

  return (
    <form method='POST' onSubmit={(e) => {
      e.preventDefault();
      onSubmit(message)
    }}>
      <input value={message} onChange={(e) => setMessage(m => e.target.value)} className="flex-grow  outline-none text-black py-2 px-4" type='text' name='message' placeholder='send something!' />
      <input type='submit' value="Send" />
    </form>
  )
}

