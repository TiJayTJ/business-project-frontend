import TrainingService from '@/API/TrainingService'
import { IconCheck } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ControlPopover } from './ControlPopover'
import { ControlProps, PropsWithId } from './controlTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { notifications } from '@/utils/helpers'

const confirmSchema = z.object({
  date: z.date({ required_error: 'Обязательное поле' })
})

type ConfirmSchema = z.infer<typeof confirmSchema>

export const Confirm = ({ id, disabled, setAction }: ControlProps) => {
  const [opened, setOpened] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ConfirmSchema>({
    resolver: zodResolver(confirmSchema),
    mode: 'onBlur',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: TrainingService.confirmParticipation,
    onSuccess: () => {
      setOpened(false)
      setAction()
      notifications.success({
        title: 'Заявка принята',
        message: ''
      })
    }
  })

  const onSubmit = async (data: ConfirmSchema) => {
    await mutateAsync({
      employeeId: id,
      ...data
    })
  }

  return (
    <ControlPopover
      disabled={disabled}
      opened={opened}
      setOpened={setOpened}
      icon={<IconCheck />}
      color="green"
      action={handleSubmit(onSubmit)}
      loading={isSubmitting}
      error={error}
    >
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
