import React from 'react'

interface Props {
  imageUrl: string | undefined;
  className?: string
}

export default function Avatar({ imageUrl, className }: Props) {
  return (
    <img src={imageUrl} className={`w-7 rounded-full ${className}`} />
  )
}

