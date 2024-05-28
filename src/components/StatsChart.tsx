import { type FC } from 'react'

import { rgba } from '@mantine/core'
import { Bar } from 'react-chartjs-2'

import { type UserStage } from '@/types/UserStage'
import { stageColor, stageName } from '@/utils/constants'

export const options = {
  scales: { y: { beginAtZero: true } }
}

interface StartsChartProps {
  data: Record<UserStage, number>
}

export const StartsChart: FC<StartsChartProps> = ({ data: raw }) => {
  const labels = Object.keys(raw).map((item) => stageName[item as UserStage])

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество',
        data: Object.values(raw),
        borderWidth: 1,
        borderColor: Object.keys(raw).map(
          (item) => stageColor[item as UserStage]
        ),
        borderRadius: 16
      }
    ]
  }

  return <Bar options={options} data={data} />
}
