
import { Button, Center, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.locale('ru')

const queryClient = new QueryClient()
const CLIENT_ID = 'Ov23liICeP9alo7lsEaQ'

function AuthorizationPage() {
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
          <Center h="100vh">
            <Button
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`}
              component="a"
              variant="filled"
              size="md"
              radius="md"
            >
              Войти при помощи Github
            </Button>
          </Center>
        </DatesProvider>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AuthorizationPage
