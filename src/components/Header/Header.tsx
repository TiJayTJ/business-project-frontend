import { Anchor, Box, Container, Group, Tabs } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { clsx } from 'clsx'

interface TabProps extends PropsWithChildren, HeaderProps {
  to: string
}

const Tab: FC<TabProps> = (props) => {
  // const { pathname } = useLocation()

  return (
    <Box
      onClick={() => props.setRoute(props.to)}
      // component={Link}
      className={clsx(styles.tab, { [styles.active]: false })}
      {...props}
      // underline="never"
    />
  )
}

interface HeaderProps {
  setRoute: (route: string) => void
}

export const Header: FC<HeaderProps> = ({ setRoute }) => {
  return (
    <Container w="100%">
      <Group gap={0} className={styles.tabs}>
        <Tab to="/" setRoute={setRoute}>
          Сотрудники
        </Tab>
        <Tab to="/stats" setRoute={setRoute}>
          Статистика
        </Tab>
      </Group>
    </Container>
  )
}
