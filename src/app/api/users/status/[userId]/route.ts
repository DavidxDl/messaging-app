import { auth } from "@clerk/nextjs/server"
import { Status } from "@prisma/client"
import { db } from "~/server/db"

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const { status } = await request.json() as { status: Status }
  const update = await db.user.update({ where: { id: params.userId }, data: { status: status === Status.ONLINE ? Status.OFFLINE : Status.ONLINE } })
  console.log(update)
  return Response.json({ status: 200 })
}
