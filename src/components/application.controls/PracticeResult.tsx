import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import TrainingService from '@/API/TrainingService'
import { notifications } from '@/utils/helpers'

import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { ControlPopover } from './ControlPopover'
import { type ControlProps, PropsWithId } from './controlTypes'

const passSchema = z.object({
  date: z.date({ required_error: 'Обязательное поле' })
})

type PassSchema = z.infer<typeof passSchema>

interface PracticeResultProps extends ControlProps {
  res: boolean
}

export const PracticeResult = ({
  id,
  disabled,
  setAction,
  res
}: PracticeResultProps) => {
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
    mutationFn: TrainingService.practiceResult,
    onSuccess: () => {
      setOpened(false)
      setAction()

      const notify = res ? notifications.success : notifications.error

      notify({ title: res ? 'Практику сдал' : 'Практику не сдал' })
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
