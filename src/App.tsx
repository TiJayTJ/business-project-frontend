import { useEffect, useState } from 'react'
import { PostList } from './components/PostList'
import { PostForm } from './components/PostForm'
import { PostFilter } from './components/PostFilter'

import { Post } from './types/Post'
import { SortValue } from './types/SortValue'
import { MyModal } from './components/modal/MyModal'

import '@mantine/core/styles.css'
import './App.css'
import '@mantine/dates/styles.css'

import { usePosts } from './components/hooks/usePost'
import PostService from './API/PostService'
import { useFetching } from './components/hooks/useFetching'
import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  MantineProvider,
  Tabs
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DatesProvider } from '@mantine/dates'
import { IconUserPlus } from '@tabler/icons-react'

import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)
dayjs.locale('ru')

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const sortedAndSearchedPosts = usePosts(
    posts,
    filter.sort as SortValue,
    filter.query
  )
  const {
    fetch: fetchPosts,
    isLoading: isPostsLoading,
    error: postError
  } = useFetching(async () => {
    const posts = await PostService.getAll()
    setPosts(posts)
  })
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost])
  }

  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        primaryColor: 'violet'
      }}
    >
      <DatesProvider
        settings={{
          locale: 'ru',
          timezone: undefined
        }}
      >
        <AppShell>
          <AppShell.Main>
            <Container>
              <MyModal
                opened={opened}
                onClose={close}
                title="Подача заявки"
                size="md"
              >
                <PostForm create={createPost} />
              </MyModal>
              <Group wrap="nowrap" mt="lg">
                <ActionIcon
                  size="xl"
                  radius="md"
                  aria-label="Settings"
                  onClick={open}
                >
                  <IconUserPlus />
                </ActionIcon>
                <PostFilter filter={filter} setFilter={setFilter} />
              </Group>
              <Tabs mt="md" variant="pills" radius="md" defaultValue="gallery">
                <Tabs.List>
                  <Tabs.Tab value="employees">Сотрудники</Tabs.Tab>
                  <Tabs.Tab value="submits">Заявки</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="employees">
                  {isPostsLoading ? (
                    <h1>Идёт загрузка........</h1>
                  ) : (
                    <PostList posts={sortedAndSearchedPosts} />
                  )}
                </Tabs.Panel>
              </Tabs>
              {postError && <h1>Произошла ошибка ${postError}</h1>}
            </Container>
          </AppShell.Main>
        </AppShell>
      </DatesProvider>
    </MantineProvider>
  )
}

export default App
