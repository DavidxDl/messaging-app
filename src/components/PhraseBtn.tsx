'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
  id: string
}

export default function PhraseBtn({ id }: Props) {
  const router = useRouter()
  const [showPhraseInput, setShowPhrase] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  async function changePhrase() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/users/phrase/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({ phrase })
        })
      if (res.ok) {
        setPhrase("");
        setShowPhrase(false);
        setIsLoading(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err)
    }

  }
  return (
    <div>
      <button disabled={isLoading} onClick={() => setShowPhrase(p => !p)}>Change Phrase</button>
      {showPhraseInput && (
        <form className='flex gap-1' onSubmit={(e) => {
          e.preventDefault();
          changePhrase().catch(err => console.log(err))
        }}>
          <input disabled={isLoading} className='text-black' type='text' value={phrase} onChange={(e) => setPhrase(e.target.value)} />
          <input disabled={isLoading} type='submit' value="send" className='cursor-pointer' />
        </form>
      )}
    </div>
  )
}

