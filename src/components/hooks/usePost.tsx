import { useMemo } from 'react'

import { type Post } from '@/types/Post'
import { type SortValue } from '@/types/SortValue'

export const useSortedPosts = (posts: Post[], sort: SortValue) => {
  const sortedPosts = useMemo(() => {
    console.log('отработала функция')
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return posts
  }, [sort, posts])

  return sortedPosts
}

export const usePosts = (posts: Post[], sort: SortValue, query: string) => {
  const sortedPosts = useSortedPosts(posts, sort)

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(
      (post: Post) =>
        post.surname.toLowerCase().includes(query) ||
        post.name.toLowerCase().includes(query) ||
        post.patronymic.toLowerCase().includes(query)
    )
  }, [query, sortedPosts])

  return sortedAndSearchedPosts
}
