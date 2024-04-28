import { Message } from '@prisma/client';
import { db } from '~/server/db';


export async function POST(request: Request) {
  const message: Message = await request.json();
  console.log(message);
  await db.message.create({
    data: {
      message: message.message,
      authorId: message.authorId,
      destineId: message.destineId

    }
  })
  return Response.json({ status: 200 })
}

