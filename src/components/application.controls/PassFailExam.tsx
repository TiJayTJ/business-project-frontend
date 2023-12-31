import TrainingService from '@/API/TrainingService'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ControlPopover } from './ControlPopover'
import { ControlProps, PropsWithId } from './controlTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { notifications } from '@/utils/helpers'

const passSchema = z.object({
  date: z.date({ required_error: 'Обязательное поле' })
})

type PassSchema = z.infer<typeof passSchema>

interface PassFailExamProps extends ControlProps {
  res: boolean
}

export const PassFailExam = ({
  id,
  disabled,
  setAction,
  res
}: PassFailExamProps) => {
  const [opened, setOpened] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PassSchema>({
    resolver: zodResolver(passSchema),
    mode: 'onBlur',
    defaultValues: {
      date: new Date()
    }
  })

  const { mutateAsync, error } = useMutation({
    mutationFn: TrainingService.takeExam,
    onSuccess: () => {
      setOpened(false)
      setAction()
      notifications.success({
        title: res ? 'Экзамен сдал' : 'Экзамен не сдал',
        message: ''
      })
    }
  })

  const onSubmit = async (data: PassSchema) => {
    await mutateAsync({
      id,
      data: { res, ...data }
    })
  }

  return (
    <ControlPopover
      disabled={disabled}
      opened={opened}
      setOpened={setOpened}
      icon={res ? <IconCheck /> : <IconX />}
      color={res ? 'green' : 'red'}
      action={handleSubmit(onSubmit)}
      loading={isSubmitting}
      error={error}
    >
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <MyDateInput
            label={res ? 'Дата сдачи' : 'Дата несдачи'}
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
