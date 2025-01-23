"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedUser, toggleFollow } = useMe();
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isFetching, setIsFetching] = useState(false)
  const isUpdating = isPending || isFetching

  const isShowButton = loggedUser && loggedUser.username !== username;
  const follow =
    loggedUser &&
    loggedUser.following.find((item) => item.username === username)
  const text = follow ? "UnFollow" : "Follow";

  const handleFollow = async () => {
    setIsFetching(true)
    await toggleFollow(user.id, !follow)
    setIsFetching(false)
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    isShowButton && (
      <div className="relative">
        {isUpdating && <div className="absolute inset-0 flex justify-center items-center z-20"><PulseLoader size={6} /> </div>}
        <Button disabled={isUpdating} text={text} onClick={handleFollow} red={text === "UnFollow"} />
      </div>
    )
  );
}
