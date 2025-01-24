import { auth } from "@/auth";
import { createPost, getFollowingPpostOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return new Response('Authentication Error', { status: 401 })
  }

  return getFollowingPpostOf(user.username).then(data => NextResponse.json(data))
}

export async function POST(req: NextRequest) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return new Response('Authentication Error', { status: 401 })
  }

  const form = await req.formData()
  const text = form.get('text')?.toString()
  const file = form.get('file') as Blob

  if (!text || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, text, file).then(data => NextResponse.json(data))
}