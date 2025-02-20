import { StoreProvider } from 'easy-peasy'
import * as React from 'react'
import store from './redux/store'
import { ModalProvider } from './provider'
export type ReactHookModalProviderProps = {
  children: React.ReactNode
  modals: React.FunctionComponent[]
}
export const ReactHookModalProvider = ({
  children,
  modals
}: ReactHookModalProviderProps) => {
  return (
    <StoreProvider store={store}>
      <ModalProvider modals={modals}>{children}</ModalProvider>
    </StoreProvider>
  )
}
export * from './hook'
