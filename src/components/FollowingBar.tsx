"use client";

import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollavleBar from "./ui/ScrollableBar";
import useMe from "@/hooks/useMe";

export default function FollowingBar() {
  const { user, isLoading: loading } = useMe();

  const users = user?.following && [
    ...user?.following,
  ];

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        !users || (users.length === 0 && <p>{"You don't have following"}</p>)
      )}
      {users && users.length > 0 && (
        <ScrollavleBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollavleBar>
      )}
    </section>
  );
}
