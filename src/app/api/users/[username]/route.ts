
import { auth } from '@clerk/nextjs/server'
import { db } from '~/server/db';

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { userId } = auth();
  if (userId) {
    const users = await db.user.findMany({ where: { username: { contains: params.username, mode: 'insensitive' } } })
    return Response.json(users);
  }

}


