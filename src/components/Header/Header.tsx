import { Anchor, Box, Container, Group, Tabs } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { clsx } from 'clsx'

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
  return (
    <Container w="100%">
      <Group gap={0} className={styles.tabs}>
        <Tab to="/" {...props}>
          Сотрудники
        </Tab>
        <Tab to="/stats" {...props}>
          Статистика
        </Tab>
      </Group>
    </Container>
  )
}
