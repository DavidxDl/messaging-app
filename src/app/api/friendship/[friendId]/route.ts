import { headers } from "next/headers";
import { db } from "~/server/db"

export async function POST(request: Request) {
  const res = await request.json() as { friendId: string, userId: string }
  console.table(res)
  await db.friendship.create({ data: { friendOfId: res.userId, friendId: res.friendId } })
  console.log("friendship created !")
  return Response.json({ headers: { status: 200 } });
}
