import { Anchor, Container, Group, Tabs } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { clsx } from 'clsx'

interface TabProps extends PropsWithChildren {
  to: string
}

const Tab: FC<TabProps> = (props) => {
  const { pathname } = useLocation()

  return (
    <Anchor
      component={Link}
      className={clsx(styles.tab, { [styles.active]: pathname === props.to })}
      {...props}
      underline="never"
    />
  )
}

export const Header: FC = () => {
  return (
    <Container w="100%">
      <Group gap={0} className={styles.tabs}>
        <Tab to="/">Сотрудники</Tab>
        <Tab to="/stats">Статистика</Tab>
      </Group>
    </Container>
  )
}
