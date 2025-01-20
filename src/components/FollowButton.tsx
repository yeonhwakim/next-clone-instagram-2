"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/useMe";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedUser } = useMe();

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
