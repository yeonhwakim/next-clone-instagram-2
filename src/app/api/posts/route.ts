import { auth } from "@/auth";
import { getFollowingPpostOf } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return new Response('Authentication Error', { status: 401 })
  }

  return getFollowingPpostOf(user.username).then(data => NextResponse.json(data))
}