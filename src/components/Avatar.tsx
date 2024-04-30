import React from 'react'

export default function Avatar({ imageURl }: { imageURl: string }) {
  return (
    <img src={imageURl} className='w-10 rounded-full' />
  )
}

