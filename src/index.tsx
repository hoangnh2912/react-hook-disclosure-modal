import * as React from 'react'
import { ModalWrapper } from './provider'
export type ReactHookModalProviderProps = {
  children: React.ReactNode
  modals: Record<string, React.FunctionComponent>
}
export const ReactHookModalProvider = ({
  children,
  modals
}: ReactHookModalProviderProps) => {
  return (
    <React.Fragment>
      <ModalWrapper modals={modals} />
      {children}
    </React.Fragment>
  )
}
export * from './hook'
