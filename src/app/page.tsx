import { auth } from "@/auth";
import { redirect } from "next/navigation";

import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";

export default async function HomePage() {
  const session = await auth()
  const user = session?.user

  if (!user) return redirect('/signin')

  return (
    <section className="w-full flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
