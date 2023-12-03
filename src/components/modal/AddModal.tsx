import { Post } from '@/types/Post'
import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  Text,
  TextInput,
  Textarea
} from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import dayjs from 'dayjs'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TrainingService from '@/API/TrainingService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MyModal } from './MyModal'
import { notifications } from '@mantine/notifications'
import { signUpSchema } from './SignUpSchema'

type TSignUpSchema = z.infer<typeof signUpSchema>

const dateFormat = 'D MMMM YYYY'

const dateParser: DateInputProps['dateParser'] = (input) =>
  dayjs(
    input,
    [
      dateFormat,
      'D.M.YYYY',
      'DD.MM.YYYY',
      'D/M/YYYY',
      'DD/MM/YYYY',
      'D-M-YYYY',
      'DD-MM-YYYY'
    ],
    'ru'
  ).toDate()

interface AddModalProps extends ModalProps {}

export const AddModal: FC<AddModalProps> = ({ opened, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur'
  })

  const queryClient = useQueryClient()

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: TrainingService.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      reset()
      onClose()
      notifications.show({
        title: 'Пользователь успешно добавлен',
        message: 'Проверьте список пользователей',
        color: 'green'
      })
    }
  })

  const onSubmit = async (data: TSignUpSchema) => {
    await mutate(data)
  }

  return (
    <MyModal opened={opened} onClose={onClose} title="Подача заявки">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="lg" mb="xl">
          <Stack gap="xs">
            <Text fw={700}>Сотрудник</Text>
            <Group grow align="flex-start">
              <TextInput
                {...register('employeeSurname')}
                withAsterisk
                placeholder="Введите фамилию"
                label="Фамилия"
                error={errors.employeeSurname?.message}
              />
              <TextInput
                withAsterisk
                {...register('employeeName')}
                placeholder="Введите имя"
                label="Имя"
                error={errors.employeeName?.message}
              />
            </Group>
            <TextInput
              {...register('employeePatronymic')}
              placeholder="Введите отчество"
              label="Отчество"
              error={errors.employeePatronymic?.message}
            />
            <TextInput
              {...register('employeeJobTitle')}
              withAsterisk
              placeholder="Введите должность"
              label="Должность"
              error={errors.employeeJobTitle?.message}
            />
          </Stack>
          <Stack gap="xs">
            <Text fw={700}>Руководитель</Text>
            <Group grow align="flex-start">
              <TextInput
                {...register('leaderSurname')}
                withAsterisk
                placeholder="Введите фамилию"
                label="Фамилия"
                error={errors.leaderSurname?.message}
              />
              <TextInput
                withAsterisk
                {...register('leaderName')}
                placeholder="Введите имя"
                label="Имя"
                error={errors.leaderName?.message}
              />
            </Group>
            <TextInput
              {...register('leaderPatronymic')}
              placeholder="Введите отчество"
              label="Отчество"
              error={errors.leaderPatronymic?.message}
            />
            <TextInput
              {...register('leaderJobTitle')}
              withAsterisk
              placeholder="Введите должность"
              label="Должность"
              error={errors.leaderJobTitle?.message}
            />
          </Stack>
          <TextInput
            {...register('project')}
            label="Название проекта"
            placeholder="Введите название проекта"
            withAsterisk
            error={errors.project?.message}
          />
          <Textarea
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
        </Stack>
        <Stack>
          {isError && (
            <Text fz="sm" c="red">
              Произошла ошибка {error.message}
            </Text>
          )}
          <Button type="submit" disabled={isSubmitting || isPending} fullWidth>
            Добавить сотрудника
          </Button>
        </Stack>
      </form>
    </MyModal>
  )
}
