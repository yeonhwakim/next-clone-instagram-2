import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserforProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string) => getUserforProfile(username));

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) ・ Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
