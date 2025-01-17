import { ProfileUser } from "@/model/user";
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

export async function searchUsers(keyword?: string) {
  const query = keyword ? `&& (name match "${keyword}") || (username match "${keyword}")` : ''

  return client.fetch(
    `*[_type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers),
    }
    `
  ).then(users => users.map((user: ProfileUser) => ({ ...user, following: user.following ?? 0, followers: user.followers ?? 0 })))

}