import { useEffect, useState } from 'react'

import { AppShell, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { Header } from '@/components/Header/Header'
import { Home } from '@/components/tabs/Home'
import { Stats } from '@/components/tabs/Stats'

dayjs.extend(customParseFormat)
dayjs.locale('ru')

const queryClient = new QueryClient()

function RegisteredHome() {
  const [route, setRoute] = useState('/')

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const codeParam = urlParams.get('code')
    console.log(codeParam)
  }, [])

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
          <AppShell
            header={{ height: 60 }}
            styles={{
              header: { display: 'flex', alignItems: 'flex-end' }
            }}
          >
            <AppShell.Header withBorder={false}>
              <Header setRoute={setRoute} route={route} />
            </AppShell.Header>
            <AppShell.Main>
              {/* <Outlet /> */}
              {route === '/' ? <Home /> : <Stats />}
            </AppShell.Main>
          </AppShell>
        </DatesProvider>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default RegisteredHome
