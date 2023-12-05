import TrainingService from '@/API/TrainingService'
import { IconClipboardText, IconCube, IconX } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { MyTextArea } from '../UI/textArea/MyTextArea'
import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ControlPopover } from './ControlPopover'
import { ControlProps, PropsWithId } from './controlTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { notifications } from '@/utils/helpers'
import { TestType } from '@/types/TestType'
import { NumberInput, Select } from '@mantine/core'

const resultFormSchema = z.object({
  date: z.date({ required_error: 'Обязательное поле' }),
  testType: z.nativeEnum(TestType, {
    required_error: 'Обязательное поле'
  }),
  score: z
    .number({ required_error: 'Обязательное поле' })
    .min(0, 'Количество баллов от 0 до 20')
    .max(20, 'Количество баллов от 0 до 20')
})

type ResultFormSchema = z.infer<typeof resultFormSchema>

interface StudyProps extends ControlProps {
  practice: boolean
}

export const Study = ({ id, disabled, setAction, practice }: StudyProps) => {
  const [opened, setOpened] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<ResultFormSchema>({
    resolver: zodResolver(resultFormSchema),
    mode: 'onBlur',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: practice
      ? TrainingService.takePractice
      : TrainingService.takeModule,
    onSuccess: () => {
      setOpened(false)
      setAction()
      notifications.success({
        title: 'Результат сохранён',
        message: ''
      })
    }
  })

  const onSubmit = async (data: ResultFormSchema) => {
    await mutateAsync({
      id,
      data
    })
  }

  const options = practice
    ? [TestType.PRACTICE_TASK_1, TestType.PRACTICE_TASK_2]
    : [
        TestType.MODULE_1,
        TestType.MODULE_2,
        TestType.MODULE_3,
        TestType.MODULE_4,
        TestType.MODULE_5,
        TestType.MODULE_6,
        TestType.MODULE_7,
        TestType.MODULE_8
      ]

  return (
    <ControlPopover
      disabled={disabled}
      opened={opened}
      setOpened={setOpened}
      icon={practice ? <IconClipboardText /> : <IconCube />}
      color={practice ? 'indigo' : 'orange'}
      action={handleSubmit(onSubmit)}
      loading={isLoading}
      error={error}
    >
      <Controller
        name="testType"
        control={control}
        render={({ field }) => (
          <Select
            label={practice ? 'Практическое задание' : 'Модуль'}
            size="md"
            radius="md"
            data={options.map((item) => ({
              value: item,
              label: item.split('_').join(' ')
            }))}
            withAsterisk
            placeholder={practice ? 'Выберите задание' : 'Выберите модуль'}
            comboboxProps={{ withinPortal: false }}
            error={errors.testType?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="score"
        control={control}
        render={({ field }) => (
          <NumberInput
            size="md"
            radius="md"
            rightSection={<></>}
            label={practice ? 'Результаты практики' : 'Результаты модуля'}
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
            label="Дата сдачи"
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
