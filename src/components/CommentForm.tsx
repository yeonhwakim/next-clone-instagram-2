"use client";

import { FormEvent, useState } from "react";
import SmaileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300"
    >
      <SmaileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="Add a comment."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold  ml-2 ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        post
      </button>
    </form>
  );
}
