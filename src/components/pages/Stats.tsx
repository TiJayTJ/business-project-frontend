import { Box, Container, Group } from '@mantine/core'
import { FC } from 'react'
import { MyDateInput } from '../UI/myDateInput/MyDateInput'
import { MyButton } from '../UI/button/MyButton'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import TrainingService from '@/API/TrainingService'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { UserStage } from '@/types/UserStage'
import { stageName } from '@/utils/constants'
import { StartsChart } from '../StatsChart'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const statsSchema = z.object({
  startDateTime: z.date({ required_error: 'Обязательное поле' }),
  endDateTime: z.date({ required_error: 'Обязательное поле' })
})

type StatsSchema = z.infer<typeof statsSchema>

export const Stats: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<StatsSchema>({
    resolver: zodResolver(statsSchema),
    mode: 'onBlur'
  })

  const { data, mutateAsync, error } = useMutation({
    mutationFn: TrainingService.fromPeriod,
    onSuccess: console.log
  })

  const onSubmit = async (data: StatsSchema) => {
    await mutateAsync(data)
  }

  return (
    <Container mt="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group justify="space-between" align="flex-end">
          <Group gap="lg">
            <Controller
              name="startDateTime"
              control={control}
              render={({ field }) => (
                <MyDateInput
                  label="Начало периода"
                  withAsterisk
                  error={errors.startDateTime?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="endDateTime"
              control={control}
              render={({ field }) => (
                <MyDateInput
                  label="Конец периода"
                  withAsterisk
                  error={errors.endDateTime?.message}
                  {...field}
                />
              )}
            />
          </Group>
          <MyButton type="submit">Получить данные</MyButton>
        </Group>
      </form>

      <Box mt="xl">{data && <StartsChart data={data} />}</Box>
    </Container>
  )
}
