import UserProfile from "@/components/UserProfile";
import { getUserforProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  const user = await getUserforProfile(username);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}
