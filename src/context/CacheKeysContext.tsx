import { createContext, useContext } from "react";

type CacheKeysContext = {
  postsKey: string
}

export const CacheKeysContext = createContext<CacheKeysContext>({
  postsKey: '/api/posts'
})

export const useCacheKeys = () => useContext(CacheKeysContext)
