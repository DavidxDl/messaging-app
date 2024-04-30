import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link';
import React from 'react'
import Avatar from './Avatar';

export default async function Navbar() {
  const { userId } = auth();
  const user = await currentUser()

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

