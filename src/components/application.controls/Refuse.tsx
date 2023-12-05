import TrainingService from '@/API/TrainingService'
import { IconX } from '@tabler/icons-react'
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

const refuseSchema = z.object({
  reason: z.string().min(1, 'Обязательное поле'),
  date: z.date({ required_error: 'Обязательное поле' })
})

type RefuseSchema = z.infer<typeof refuseSchema>

export const Refuse = ({ id, disabled, setAction }: ControlProps) => {
  const [opened, setOpened] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isLoading }
  } = useForm<RefuseSchema>({
    resolver: zodResolver(refuseSchema),
    mode: 'onBlur',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: TrainingService.refuseParticipation,
    onSuccess: () => {
      setOpened(false)
      setAction()
      notifications.success({
        title: 'Заявка отклонена'
      })
    }
  })

  const onSubmit = async (data: RefuseSchema) => {
    await mutateAsync({
      id,
      ...data
    })
  }

  return (
    <ControlPopover
      disabled={disabled}
      opened={opened}
      setOpened={setOpened}
      icon={<IconX />}
      color="red"
      action={handleSubmit(onSubmit)}
      loading={isLoading}
      error={error}
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <MyDateInput
            label="Дата отказа"
            popoverProps={{ withinPortal: false }}
            withAsterisk
            error={errors.date?.message}
            {...field}
          />
        )}
      />
      <MyTextArea
        {...register('reason')}
        label="Причина"
        placeholder="Введите причину отказа"
        rows={4}
        withAsterisk
        error={errors.reason?.message}
      />
    </ControlPopover>
  )
}
