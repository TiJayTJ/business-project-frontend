import { type FC, type PropsWithChildren } from 'react'

import { Box, Container, Group } from '@mantine/core'
import { clsx } from 'clsx'
import { useNavigate } from 'react-router-dom'

import { MyButton } from '../UI/button/MyButton'
import styles from './Header.module.css'

interface TabProps extends PropsWithChildren, HeaderProps {
  to: string
}

const Tab: FC<TabProps> = ({ setRoute, route, ...props }) => {
  // const { pathname } = useLocation()

  return (
    <Box
      onClick={() => setRoute(props.to)}
      // component={Link}
      className={clsx(styles.tab, { [styles.active]: route === props.to })}
      {...props}
      // underline="never"
    />
  )
}

interface HeaderProps {
  setRoute: (route: string) => void
  route: string
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
  const navigate = useNavigate()

  return (
    <Container w="100%" className={styles.root}>
      <Group gap={0} className={styles.tabs}>
        <Tab to="/" {...props}>
          Сотрудники
        </Tab>
        <Tab to="/stats" {...props}>
          Статистика
        </Tab>
      </Group>
      <MyButton
        variant="default"
        onClick={() => {
          localStorage.removeItem('token')
          navigate('/login')
        }}
      >
        Выйти
      </MyButton>
    </Container>
  )
}
