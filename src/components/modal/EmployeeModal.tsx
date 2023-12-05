import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Combobox,
  Group,
  Input,
  InputBase,
  ModalProps,
  Paper,
  Select,
  Stack,
  Text,
  Textarea,
  useCombobox
} from '@mantine/core'
import { MyModal } from './MyModal'
import { Post } from '@/types/Post'
import { PostInfo } from '../info/UserInfo'
import dayjs from 'dayjs'
import { dateFormat, dateParser, stageName } from '@/utils/constants'
import { FC, useEffect, useState } from 'react'
import { MyButton } from '../UI/button/MyButton'
import {
  IconPencil,
  IconCheck,
  IconArrowLeft,
  IconChevronDown
} from '@tabler/icons-react'
import { Controller, useForm } from 'react-hook-form'
import { EditableInfo } from '../info/EditableInfo'
import { StageBadge } from '../StageBadge'
import { SelectStage } from '../selectStage/SelectStage'
import { MyInput } from '../UI/input/MyInput'
import { MyTextArea } from '../UI/textArea/MyTextArea'
import { DateInput } from '@mantine/dates'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EditSchema, editSchema } from '../../types/EditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import EmployeeService from '@/API/EmployeeService'
import { notifications } from '@/utils/helpers'
import { LeaderSelect } from '../leader.select'

interface EmployeeModalProps extends Omit<ModalProps, 'id'> {
  id: number | null
}

export const EmployeeModal: FC<EmployeeModalProps> = ({
  id,
  opened,
  onClose: onModalClose
}) => {
  const [edit, setEdit] = useState(false)

  const {
    data,
    mutate: refreshDefaults,
    isSuccess: isDefaultsLoaded
  } = useMutation({
    mutationFn: (id: number) => EmployeeService.getById(id)
  })

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    reset
  } = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    if (id === null) return

    refreshDefaults(id)
  }, [id])

  useEffect(() => {
    if (!data) return

    reset({
      surname: data.surname,
      name: data.name,
      patronymic: data.patronymic,
      job: data.jobTitle,
      project: data.project,
      purpose: data.trainingPurpose,
      stage: data.stage,
      leader: data.leader.id,
      start: data.startTime,
      reason: data.reasonForRefuseTraining,
      email: data.email,
      active: data.isActive
    } satisfies EditSchema)
  }, [data])

  const onBack = () => {
    reset()
    setEdit(false)
  }

  const onClose = () => {
    reset()
    onModalClose()
    setEdit(false)
  }

  const queryClient = useQueryClient()

  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: EmployeeService.edit,
    onSuccess: (_, { id, data }) => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
      notifications.success({
        title: 'Данные сохранены',
        message: ''
      })
      setEdit(false)

      refreshDefaults(id)
    }
  })

  const onEdit = async (data: EditSchema) => {
    if (id === null) return

    await mutateAsync({ id, data })
  }

  const disabled = isSubmitting || isPending

  return (
    <MyModal opened={opened} onClose={onClose} title="Сотрудник">
      <form onSubmit={handleSubmit(onEdit, console.log)}>
        <Stack gap="xl">
          <Paper
            component={Stack}
            align="center"
            gap={3}
            bg="dark.6"
            p="lg"
            pos="relative"
          >
            <ActionIcon
              variant="light"
              size="xl"
              radius="xl"
              pos="absolute"
              aria-label="Edit"
              top={16}
              right={16}
              type={edit ? 'submit' : 'button'}
              onClick={edit ? () => {} : () => setEdit(true)}
              color={edit ? 'green' : ''}
              loading={disabled}
            >
              {edit ? <IconCheck /> : <IconPencil />}
            </ActionIcon>
            {edit && (
              <ActionIcon
                variant="light"
                size="xl"
                radius="xl"
                pos="absolute"
                aria-label="Edit"
                top={16}
                left={16}
                color="gray"
                onClick={onBack}
              >
                {<IconArrowLeft />}
              </ActionIcon>
            )}
            <Avatar size="xl" />
            <EditableInfo
              edit={edit}
              input={
                <Group wrap="nowrap" gap="xs" mb={2} align="flex-start">
                  <MyInput
                    description="Фамилия"
                    {...register('surname')}
                    placeholder="Фамилия"
                    error={errors.surname?.message}
                    withAsterisk
                  />
                  <MyInput
                    description="Имя"
                    {...register('name')}
                    placeholder="Имя"
                    error={errors.name?.message}
                    withAsterisk
                  />
                  <MyInput
                    description="Отчество"
                    {...register('patronymic')}
                    placeholder="Отчество"
                    error={errors.patronymic?.message}
                    withAsterisk
                  />
                </Group>
              }
            >
              <Text size="lg" fw={700} mt="xs">
                {getValues('surname')} {getValues('name')}{' '}
                {getValues('patronymic')}
              </Text>
            </EditableInfo>
            <EditableInfo
              edit={edit}
              input={
                <Controller
                  name="stage"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <SelectStage
                      {...field}
                      error={errors.stage?.message}
                      radius="xl"
                    />
                  )}
                />
              }
            >
              <StageBadge stage={getValues('stage')} />
            </EditableInfo>
          </Paper>
          <Stack gap="xs">
            <Text fw={700}>Основное</Text>
            <PostInfo
              edit={edit}
              input={
                <MyInput
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="Введите email"
                />
              }
              label="Почта"
            >
              {getValues('email')}
            </PostInfo>
            <PostInfo
              edit={edit}
              input={
                <MyInput
                  {...register('job')}
                  error={errors.job?.message}
                  placeholder="Введите должность"
                />
              }
              label="Должность"
            >
              {getValues('job')}
            </PostInfo>
            <PostInfo
              input={
                <MyTextArea
                  {...register('purpose')}
                  placeholder="Введите цель обучения"
                  minRows={1}
                  autosize
                  error={errors.purpose?.message}
                />
              }
              edit={edit}
              label="Цель обучения"
            >
              {getValues('purpose')}
            </PostInfo>
          </Stack>
          <Stack gap="xs">
            <Text fw={700}>Руководитель</Text>
            <EditableInfo
              input={
                <Controller
                  name="leader"
                  control={control}
                  render={({ field }) => (
                    <LeaderSelect {...field} error={errors.leader?.message} />
                  )}
                />
              }
              edit={edit}
            >
              <Input.Wrapper description="ФИО">
                {data?.leader.surname} {data?.leader.name}{' '}
                {data?.leader.patronymic}
              </Input.Wrapper>

              <Input.Wrapper description="Должность">
                {data?.leader.jobTitle}
              </Input.Wrapper>
            </EditableInfo>
          </Stack>
          <Stack gap="xs">
            <Text fw={700}>Сведения по проекту</Text>
            <PostInfo
              input={
                <MyInput
                  {...register('project')}
                  placeholder="Введите название"
                  error={errors.project?.message}
                />
              }
              edit={edit}
              label="Название проекта"
            >
              {getValues('project')}
            </PostInfo>
            <PostInfo
              input={
                <Controller
                  name="start"
                  control={control}
                  render={({ field }) => (
                    <DateInput
                      size="md"
                      radius="md"
                      placeholder="Выберите дату"
                      maxDate={new Date()}
                      valueFormat={dateFormat}
                      dateParser={dateParser}
                      error={errors.start?.message}
                      {...field}
                    />
                  )}
                />
              }
              edit={edit}
              label="Дата подачи заявки"
            >
              {dayjs(getValues('start')).format('D MMMM YYYY')}
            </PostInfo>
          </Stack>
          <Stack>
            {isError && (
              <Text fz="sm" c="red">
                Произошла ошибка {error.message}
              </Text>
            )}
            {edit && (
              <MyButton type="submit" loading={disabled} fullWidth>
                Сохранить изменения
              </MyButton>
            )}
          </Stack>
        </Stack>
      </form>
    </MyModal>
  )
}
