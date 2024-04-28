'use client';

import { useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

interface Props {
  userId: string;
  destineId: string;
}

export default function Chat({ userId, destineId }: Props) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  return (
    <div className='flex flex-col'>
      <Messages userId={userId} destineId={destineId} shouldRefresh={shouldRefresh} />
      <MessageInput authorId={userId} destineId={destineId} refresh={() => setShouldRefresh(e => !e)} />
    </div>
  )
}

