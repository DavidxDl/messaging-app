import { Status as STATUS } from '@prisma/client';
import React from 'react'
import Avatar from './Avatar';
import Link from 'next/link';
import Status from './Status';

interface Props {
  friends: {
    friends: {
      id: string;
      username: string;
      phrase: string | null;
      status: STATUS;
      imgUrl: string;
    }
  }[]
}

export default function FriendList({ friends }: Props) {
  return (
    <div className="self-start flex flex-col bg-black/60 rounded-xl p-2 h-full  md:min-w-full overflow-hidden flex-nowrap">
      <h1 className="text-xl self-start my-3 ">Friends</h1>
      <ul className="overflow-scroll">{friends?.map(f =>
        <li key={f.friends.id}>
          <Link className="flex gap-2 items-center hover:font-extrabold text-white" href={`/friends/${f.friends.id}`}>
            <Avatar imageUrl={f.friends.imgUrl} />
            <div className="flex items-center gap-1">
              <span className="text-xl">{f.friends.phrase}</span>
              <span className="opacity-75">@{f.friends.username}</span>
              <Status status={f.friends.status} />
            </div>
          </Link>
        </li>)}
      </ul>
    </div>
  )
}

