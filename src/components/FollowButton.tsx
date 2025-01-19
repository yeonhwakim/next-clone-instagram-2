"use client";

import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedUser } = useSWR<HomeUser>("/api/me");

  const isShowButton = loggedUser && loggedUser.username !== username;
  const isFollowing =
    loggedUser &&
    loggedUser.following.find((item) => item.username === username);
  const text = isFollowing ? "UnFollow" : "Follow";

  return (
    isShowButton && (
      <Button text={text} onClick={() => {}} red={text === "UnFollow"} />
    )
  );
}
