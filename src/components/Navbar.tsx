import { RedirectToSignIn, SignInButton, SignOutButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import Avatar from './Avatar';
import { db } from '~/server/db';

export default async function Navbar() {
  const { userId } = auth();
  if (!userId)
    return <RedirectToSignIn />

  const user = await currentUser();
  const friends = await db.friendship.findMany({ where: { friendOfId: userId }, select: { friends: true } })

  return (
    <nav className='flex justify-between bg-slate-900 w-full py-4 px-2'>
      <Link href="/" className='font-extrabold text-white text-xl'>Messaging App</Link>
      {!!userId && (
        <div className='flex gap-4 items-center'>
          {<Link href="/user-profile" className='hover:font-extrabold text-white flex items-center gap-1'>
            {user?.username}
            <Avatar imageUrl={user?.imageUrl} />
          </Link>}
          <SignOutButton>
            <button className='text-white hover:font-extrabold transition-all'>Sign out</button>
          </SignOutButton>
        </div>
      )}
      {!userId && <SignInButton><button className='text-white hover:font-extrabold transition-all'>Sign in</button></SignInButton>}

    </nav>
  )
}

