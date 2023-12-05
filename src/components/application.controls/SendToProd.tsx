import TrainingService from '@/API/TrainingService'
import { IconArrowNarrowRight, IconX } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { MyTextArea } from '../UI/textArea/MyTextArea'
import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ControlPopover } from './ControlPopover'
import { ControlProps } from './controlTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { notifications } from '@/utils/helpers'
import { LeaderSelect } from '../leader.select'
import { MyInput } from '../UI/input/MyInput'

const sendToProdSchema = z.object({
  leaderId: z.number({ required_error: 'Обязательное поле' }),
  date: z.date({ required_error: 'Обязательное поле' }),
  project: z.string().min(1, 'Обязательное поле')
})

type SendToProdSchema = z.infer<typeof sendToProdSchema>

export const SendToProd = ({ id, disabled, setAction }: ControlProps) => {
  const [opened, setOpened] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<SendToProdSchema>({
    resolver: zodResolver(sendToProdSchema),
    mode: 'onSubmit',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: TrainingService.sendToProd,
    onSuccess: () => {
      setOpened(false)
      setAction()
      notifications.success({
        title: 'Отправлен на практику',
        message: ''
      })
    }
  })

  const [canClose, setCanClose] = useState(true)

  const onSubmit = async (data: SendToProdSchema) => {
    await mutateAsync({ employeeId: id, ...data })
  }

  return (
    <ControlPopover
      disabled={disabled}
      opened={opened}
      setOpened={(o) => {
        canClose && setOpened(o)
      }}
      icon={<IconArrowNarrowRight />}
      color="indigo"
      action={handleSubmit(onSubmit)}
      loading={isLoading}
      error={error}
    >
      <Controller
        name="leaderId"
        control={control}
        render={({ field }) => (
          <LeaderSelect
            {...field}
            error={errors.leaderId?.message}
            label="Руководитель"
            withAsterisk
            withinPortal={false}
            onCreate={() => setCanClose(false)}
            onCreateEnd={() => setCanClose(true)}
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
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <MyDateInput
            label="Дата"
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
