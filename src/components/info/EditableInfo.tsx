import { type FC, type PropsWithChildren, type ReactNode } from 'react'

export interface EditableInfoProps extends PropsWithChildren {
  edit: boolean
  input: ReactNode
}

export const EditableInfo: FC<EditableInfoProps> = ({
  edit,
  input,
  children
}) => {
  return edit ? input : children
}
