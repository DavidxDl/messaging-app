import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export async function GET(request: Request, { params }: { params: { friendId: string } }) {
  const { userId } = auth();
  const messages = await db.message.findMany(
    {
      where: {
        OR: [
          {
            AND:
              [
                { authorId: userId! },
                { destineId: params.friendId }
              ]
          },
          {
            AND:
              [
                { authorId: params.friendId },
                { destineId: userId! }

              ]
          }
        ]
      },
      include: {
        author: true
      }

    })
  console.log(messages);
  return Response.json(messages);
}

