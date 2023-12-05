export interface PropsWithId {
  id: number
}

export interface ControlProps extends PropsWithId {
  disabled: boolean
  setAction: (result?: boolean) => void
}

export enum Action {
  CONFIRM = 'CONFIRM',
  REFUSE = 'REFUSE'
}
