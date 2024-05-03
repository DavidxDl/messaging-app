'use client';

import { Status as STATUS } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
  status: STATUS;
  id: string;
}

export default function UserStatus({ status, id }: Props) {
  const router = useRouter();
  async function updateStatus() {
    try {

      const res = await fetch(`/api/users/status/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status })
        })
      if (res.ok)
        router.refresh();

    } catch (err) {
      console.error(err)
    }

  }
  return (
    <button onClick={() => updateStatus().catch(err => console.error)} className={status === STATUS.ONLINE ? 'text-green-500' : 'text-gray-600'}>{status.toLowerCase()}</button>
  )
}
