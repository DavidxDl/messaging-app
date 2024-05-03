'use client';

import { useState } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { User } from "@prisma/client";

interface Props {
  userId: string;
  destineId: string;
  friend: User;
}

export default function Chat({ userId, friend, destineId }: Props) {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  return (
    <div className=' flex flex-col '>
      <Messages friend={friend} userId={userId} destineId={destineId} shouldRefresh={shouldRefresh} />
      <MessageInput authorId={userId} destineId={destineId} refresh={() => setShouldRefresh(e => !e)} />
    </div>
  )
}

