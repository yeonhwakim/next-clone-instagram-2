import { getPost } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () => {
    const { id } = await context.params;

    return getPost(id).then((data) => NextResponse.json(data));
  })
}
