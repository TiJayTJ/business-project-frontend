import React, { useState, MouseEvent, FC } from 'react'
import { Button, TextInput } from '@mantine/core'
import { Post } from '@/types/Post'
import { Group, Stack, Text, Textarea } from '@mantine/core'
import { DateInput, DateInputProps } from '@mantine/dates'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useFetching } from './hooks/useFetching'
import TrainingService from '@/API/TrainingService'

const signUpSchema = z.object({
  leaderName: z.string().min(2, 'Имя: не менее 2 букв'),
  leaderSurname: z.string().min(2, 'Фамилия: не менее 2 букв'),
  leaderPatronymic: z.string(),
  leaderJobTitle: z.string().min(1, 'Обязательное поле'),
  project: z.string().min(1, 'Обязательное поле'),
  employeeName: z.string().min(2, 'Имя: не менее 2 букв'),
  employeeSurname: z.string().min(2, 'Фамилия: не менее 2 букв'),
  employeePatronymic: z.string(),
  employeeJobTitle: z.string().min(1, 'Обязательное поле'),
  trainingPurpose: z.string().min(1, 'Обязательное поле'),
  date: z.date({
    required_error: 'Обязательное поле'
  })
})

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

interface PostFormProps {
  create: (newPost: Post) => void
}

export const PostForm: FC<PostFormProps> = ({ create }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur'
    // defaultValues: {
    //   date: new Date()
    // }
  })

  const { fetch, isLoading, error } = useFetching<TSignUpSchema>(
    async (data) => {
      if (!data) return
      const result = await TrainingService.submit(data)
    }
  )

  const onSubmit = async (data: TSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await fetch(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg" mb="xl">
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
        {error && (
          <Text fz="sm" c="red">
            Произошла ошибка {error}
          </Text>
        )}
        <Button type="submit" disabled={isSubmitting || isLoading} fullWidth>
          Добавить сотрудника
        </Button>
      </Stack>
    </form>
  )
}
