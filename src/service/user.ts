import { client } from "@/sanity";

type Props = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null
}

export async function addUser({ id, name, username, email, image }: Props) {
  return client.createIfNotExists({
    _id: email.replace(/@/g, "-at-").replace(/\./g, "-dot-"),
    _type: 'user',
    name,
    username,
    email,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  })
}