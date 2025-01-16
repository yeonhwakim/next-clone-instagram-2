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

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks":bookmarks[]->_id
    }`
  )
}