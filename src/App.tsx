import '@mantine/core/styles.css'
import styles from './App.module.css'
import '@mantine/dates/styles.css'
import {
  ActionIcon,
  AppShell,
  Container,
  Group,
  MantineProvider,
  Tabs
} from '@mantine/core'

import { DatesProvider } from '@mantine/dates'

import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import '@mantine/notifications/styles.css'
import { Notifications } from '@mantine/notifications'
import { Header } from './components/Header/Header'
import { Outlet } from 'react-router-dom'

dayjs.extend(customParseFormat)
dayjs.locale('ru')

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
          <AppShell header={{ height: 60 }} classNames={styles}>
            <AppShell.Header withBorder={false}>
              <Header />
            </AppShell.Header>
            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>
        </DatesProvider>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
