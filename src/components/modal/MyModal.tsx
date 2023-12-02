import React, { Children, FC, PropsWithChildren } from 'react'
import { Modal, ModalProps, ScrollArea, Text } from '@mantine/core'
import styles from './MyModal.module.css'

interface MyModalProps extends ModalProps {}

export const MyModal: FC<MyModalProps> = ({
  children,
  title,
  ...props
}: MyModalProps) => {
  return (
    <Modal
      {...props}
      centered
      title={
        <Text size="xl" fw={700}>
          {title}
        </Text>
      }
      radius="lg"
      scrollAreaComponent={(props) => (
        <ScrollArea.Autosize
          {...props}
          classNames={styles}
          scrollbarSize={10}
        />
      )}
    >
      {children}
    </Modal>
  )
}
