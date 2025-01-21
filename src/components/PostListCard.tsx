"use client";

import { SimplePost } from "@/model/post";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  console.log("comments")
  console.log(comments)
  console.log("comments")
  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar username={username} image={userImage} />
      <Image
        className="w-full objec-cover aspect-square"
        src={image}
        alt={`Photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} >
        {text && (
          <p>
            <span className="font-bold mr-1">{username}</span>
            {text}
          </p>
        )}
        {comments > 1 && <button className="font-bold my-2 text-sky-500" onClick={() => setOpenModal(true)}>{`View all ${comments} comments`}</button>}
      </ActionBar>
      <CommentForm />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
