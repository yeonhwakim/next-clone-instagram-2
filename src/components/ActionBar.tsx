"use client";

import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";

import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/usePosts";
import useMe from "@/hooks/useMe";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
  const { likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(post.id) ?? false;

  const handleLike = (like: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmard: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && setBookmark(post.id, bookmard);
  };

  const handleComment = (comment: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user && onComment({ comment, username: user.username, image: user.image });
  };
  return (
    <>
      <div className="flex justify-between items-center my-2 px-4">
        <ToggleButton
          title={liked ? 'unlike' : 'like'}
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          title={liked ? 'unbookmark' : 'bookmark'}
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"
          }`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
