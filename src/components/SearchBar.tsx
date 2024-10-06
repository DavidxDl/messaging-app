'use client';
import { User, auth } from '@clerk/nextjs/server';
import { Status } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'

interface Props {
  friends: {
    friends: {
      id: string;
      username: string;
      imgUrl: string;
      status: Status;
      phrase: string | null;
    };
  }[];
  userId: string;

}

const friendsIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
  <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
  <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
</svg>

export default function SearchBar({ friends, userId }: Props) {
  const router = useRouter()
  const [isFocus, setIsFocus] = useState(false);
  const [friendSearch, setFriendSearch] = useState("")
  const [results, setResults] = useState<User[]>([])
  const searchWrapper = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (searchWrapper.current && !searchWrapper.current.contains(e.target)) {
        setIsFocus(false);
      }
    })
  }, [])
  useEffect(() => {
    const controller = new AbortController();
    async function getResults() {
      const res = await fetch(`/api/users/${friendSearch}`, { signal: controller.signal });
      const data = await res.json() as User[];
      console.log(data)

      setResults(data)
    }
    getResults().catch(err => console.error(err));
    return () => {
      controller.abort();
    }
  }, [friendSearch])

  async function addFriend(friendId: string, userId: string) {
    if (friendSearch === "")
      return
    try {
      const res = await fetch(`/api/friendship/${friendId}`,
        {
          method: "POST",
          body: JSON.stringify({ friendId, userId }),
          headers: {
            "Content-Type": "application/json"
          }
        })
      if (res.ok) {
        setFriendSearch('');
        router.refresh();
      } else {
        throw new Error("could't created friendship")

      }

    } catch (err) { console.error(err) }
  }

  return (
    <div className='relative' ref={searchWrapper}>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => console.log(e)}

        type='search'
        placeholder='Search for Friends..'
        value={friendSearch}
        onChange={(e) => setFriendSearch(s => e.target.value)}
        className='text-black p-2 rounded-full outline-none transition-all max-w-80 mt-5'
      />
      {friendSearch !== '' && isFocus && (
        < ul className='absolute overflow-y-scroll  top-14 bg-white flex flex-col max-h-80 right-0 left-0 justify-center rounded-xl pt-5 mt-2 px-2'>
          {results.map(r => (
            <li key={r.id} className='flex justify-between text-black'>
              {r.username}
              {friends.find(f => f.friends.username === r.username)
                ? <Link href={`/friends/${r.id}`}>💬</Link>
                : <button onClick={async () => await addFriend(r.id, userId)}>{friendsIcon}</button>}
            </li>
          ))}
        </ul>)}
    </div >
  )
}

