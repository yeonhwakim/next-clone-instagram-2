import { auth } from "@/auth";
import { unFollow, follow } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 400 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || follow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = isFollow ? follow : unFollow;

  return request(user.id, targetId) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
