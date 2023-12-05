import { Post } from '@/types/Post'
import { Group, Modal, ModalProps, Stack, Text } from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TrainingService from '@/API/TrainingService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyModal } from './MyModal'
import { SignUpSchema, signUpSchema } from '../../types/SignUpSchema'
import { MyInput } from '../UI/input/MyInput'
import { MyTextArea } from '../UI/textArea/MyTextArea'
import { MyButton } from '../UI/button/MyButton'
import { dateFormat, dateParser } from '@/utils/constants'
import { notifications } from '@/utils/helpers'
import { AddLeaderSchema, addLeaderSchema } from '@/types/AddLeaderSchema'
import { LeadersService } from '@/API/LeadersService'
import { Leader } from '@/types/Leader'

interface AddLeaderModalProps extends ModalProps {
  setId: (id: Leader['id']) => void
}

export const AddLeaderModal: FC<AddLeaderModalProps> = ({
  opened,
  onClose: onModalClose,
  setId
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset
  } = useForm<AddLeaderSchema>({
    resolver: zodResolver(addLeaderSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const queryClient = useQueryClient()

  const { mutateAsync, isError, error } = useMutation({
    mutationFn: LeadersService.add,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] })
      reset()
      onClose()
      notifications.success({
        title: 'Руководитель добавлен',
        message: ''
      })
      setId(id)
    }
  })

  const onSubmit = async (data: AddLeaderSchema) => {
    await mutateAsync(data)
  }

  const onClose = () => {
    onModalClose()
    reset()
  }

  return (
    <MyModal opened={opened} onClose={onClose} title="Создание руководителя">
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit(onSubmit)(e)
        }}
      >
        <Stack gap="xl">
          <Stack gap="xs">
            <Group grow align="flex-start">
              <MyInput
                {...register('surname')}
                withAsterisk
                placeholder="Введите фамилию"
                label="Фамилия"
                error={errors.surname?.message}
              />
              <MyInput
                withAsterisk
                {...register('name')}
                placeholder="Введите имя"
                label="Имя"
                error={errors.name?.message}
              />
            </Group>
            <MyInput
              {...register('patronymic')}
              placeholder="Введите отчество"
              label="Отчество"
              error={errors.patronymic?.message}
            />
            <MyInput
              {...register('job')}
              withAsterisk
              placeholder="Введите должность"
              label="Должность"
              error={errors.job?.message}
            />
          </Stack>

          <Stack>
            {isError && (
              <Text fz="sm" c="red">
                Произошла ошибка {error.message}
              </Text>
            )}
            <MyButton type="submit" loading={isLoading} fullWidth>
              Добавить руководителя
            </MyButton>
          </Stack>
        </Stack>
      </form>
    </MyModal>
  )
}
