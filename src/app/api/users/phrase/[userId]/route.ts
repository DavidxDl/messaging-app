import { db } from "~/server/db"

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const { phrase } = await request.json() as { phrase: string }
  const update = await db.user.update({ where: { id: params.userId }, data: { phrase: phrase } })
  if (update)
    console.log(update)
  return Response.json({ status: 200 })

}

