'use client'

import useSWR from "swr"

export default function FollowingBar() {
  const { data, error } = useSWR('/api/hello')
  console.log(data)
  return <p>FollowingBar</p>
}