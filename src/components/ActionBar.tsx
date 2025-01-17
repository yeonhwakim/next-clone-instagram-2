import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";

import { parseDate } from "@/util/date";

type Props = {
  likes: string[];
  username: string;
  createdAt: string;
  text: string;
}
export default function ActionBar({ likes, username, createdAt, text }: Props) {
  return (
    <>
      <div className="flex justify-between items-center my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p><span className="font-bold mr-1">{username}</span>{text}</p>
        <p className="text-xs text-neutral-500 uppercase my-2">{parseDate(createdAt)}</p>
      </div></>
  )
}