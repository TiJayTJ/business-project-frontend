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
import { LeaderSelect } from '../leader.select'

interface AddModalProps extends ModalProps {}

export const AddModal: FC<AddModalProps> = ({
  opened,
  onClose: onModalClose
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  const queryClient = useQueryClient()

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: TrainingService.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      reset()
      onClose()
      notifications.success({
        title: 'Пользователь добавлен',
        message: ''
      })
    }
  })

  const onSubmit = async (data: SignUpSchema) => {
    console.log(data)
    await mutate(data)
  }

  const onClose = () => {
    reset()
    onModalClose()
  }

  return (
    <MyModal opened={opened} onClose={onClose} title="Подача заявки">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xl">
          <Stack gap="xs">
            <Text fw={700}>Сотрудник</Text>
            <Group grow align="flex-start">
              <MyInput
                {...register('employeeSurname')}
                withAsterisk
                placeholder="Введите фамилию"
                label="Фамилия"
                error={errors.employeeSurname?.message}
              />
              <MyInput
                withAsterisk
                {...register('employeeName')}
                placeholder="Введите имя"
                label="Имя"
                error={errors.employeeName?.message}
              />
            </Group>
            <MyInput
              {...register('employeePatronymic')}
              placeholder="Введите отчество"
              label="Отчество"
              error={errors.employeePatronymic?.message}
            />
            <MyInput
              {...register('employeeMail')}
              label="Почта"
              placeholder="Введите email"
              withAsterisk
              error={errors.employeeMail?.message}
            />
            <MyInput
              {...register('employeeJobTitle')}
              withAsterisk
              placeholder="Введите должность"
              label="Должность"
              error={errors.employeeJobTitle?.message}
            />
          </Stack>
          <Controller
            name="leaderId"
            control={control}
            render={({ field }) => (
              <LeaderSelect
                {...field}
                error={errors.leaderId?.message}
                label="Руководитель"
                withAsterisk
              />
            )}
          />
          <MyInput
            {...register('project')}
            label="Название проекта"
            placeholder="Введите название проекта"
            withAsterisk
            error={errors.project?.message}
          />
          <MyTextArea
            {...register('trainingPurpose')}
            label="Цель обучения"
            placeholder="Введите цель обучения"
            rows={4}
            withAsterisk
            error={errors.trainingPurpose?.message}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateInput
                size="md"
                radius="md"
                label="Дата подачи"
                placeholder="Выберите дату"
                maxDate={new Date()}
                valueFormat={dateFormat}
                dateParser={dateParser}
                withAsterisk
                error={errors.date?.message}
                {...field}
              />
            )}
          />
          <Stack>
            {isError && (
              <Text fz="sm" c="red">
                Произошла ошибка {error.message}
              </Text>
            )}
            <MyButton
              type="submit"
              loading={isSubmitting || isPending}
              fullWidth
            >
              Добавить сотрудника
            </MyButton>
          </Stack>
        </Stack>
      </form>
    </MyModal>
  )
}
