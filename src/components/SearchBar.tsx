'use client';
import { User, auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface Props {
  friends: {
    friends: {
      id: string;
      username: string;
      imgUrl: string;
    };
  }[];
  userId: string;

}

export default function SearchBar({ friends, userId }: Props) {
  const router = useRouter()
  const [friendSearch, setFriendSearch] = useState("")
  const [results, setResults] = useState<User[]>([])
  console.table(friends)
  console.table(results)

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
    <div className='relative'>
      <input
        type='search'
        placeholder='Search for Friends..'
        value={friendSearch}
        onChange={(e) => setFriendSearch(s => e.target.value)}
        className='p-2 rounded-full outline-none max-w-48 transition-all focus:max-w-80'
      />
      {friendSearch !== '' &&
        <div className='absolute top-14 bg-white flex right-0 left-0 justify-center rounded'>
          {results.map(r => (
            <div key={r.id} className='flex gap-2'>
              {r.username}
              {friends.length === 0 || friends.some(f => f.friends.id !== r.id)
                ? <button onClick={async () => await addFriend(r.id, userId)}>Add Friend</button>
                : <Link href={`/friends/${r.id}`}>Send Message</Link>}
            </div>
          ))}
        </div>}
    </div>
  )
}

