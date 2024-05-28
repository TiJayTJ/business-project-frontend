import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CheckIcon,
  Group,
  NumberInput,
  Popover,
  Select
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { register } from 'module'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import TrainingService from '@/API/TrainingService'
import { TestType } from '@/types/TestType'
import { getNotify, notifications } from '@/utils/helpers'

import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { ControlPopover } from '../application.controls/ControlPopover'
import { type PropsWithId } from '../application.controls/controlTypes'

const resultFormSchema = z.object({
  date: z.date({ required_error: 'Обязательное поле' }),
  score: z
    .number({ required_error: 'Обязательное поле' })
    .min(0, 'Количество баллов от 0 до 20')
    .max(20, 'Количество баллов от 0 до 20')
})

type ResultFormSchema = z.infer<typeof resultFormSchema>

export const ResultFormPopover = ({ id }: PropsWithId) => {
  const [opened, setOpened] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResultFormSchema>({
    resolver: zodResolver(resultFormSchema),
    mode: 'onBlur',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: TrainingService.takeEntranceTest,
    onSuccess: (result) => {
      setOpened(false)

      const { notify } = getNotify(
        { title: 'Тест пройден' },
        { title: 'Тест не пройден' },
        { title: 'Тест не пройден', message: 'Пропущен дедлайн' },
        { title: 'Заявка отклонена', message: 'Некорректная дата' },
        result
      )

      notify()
    }
  })

  const onSubmit = async (data: ResultFormSchema) => {
    await mutateAsync({
      id,
      data: { ...data, testType: TestType.ENTRY }
    })
  }
  return (
    <ControlPopover
      opened={opened}
      setOpened={setOpened}
      icon={<IconArrowNarrowRight />}
      color="green"
      action={handleSubmit(onSubmit)}
      loading={isSubmitting}
      error={error}
    >
      <Controller
        name="score"
        control={control}
        render={({ field }) => (
          <NumberInput
            size="md"
            radius="md"
            rightSection={<></>}
            label="Результаты теста"
            placeholder="Количество баллов от 0 до 20"
            error={errors.score?.message}
            withAsterisk
            rightSectionPointerEvents="none"
            {...field}
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <MyDateInput
            label="Дата принятия"
            popoverProps={{ withinPortal: false }}
            withAsterisk
            error={errors.date?.message}
            {...field}
          />
        )}
      />
    </ControlPopover>
  )
}
function setAction() {
  throw new Error('Function not implemented.')
}
