import { Status as STATUS } from '@prisma/client'
import React from 'react'


interface Props {
  status: STATUS
}

export default function Status({ status }: Props) {
  return (
    <span className={status === STATUS.ONLINE ? 'text-green-500' : 'text-gray-600'}>{status.toLowerCase()}</span>
  )
}

