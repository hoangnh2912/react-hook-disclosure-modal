import { StoreProvider } from 'easy-peasy'
import * as React from 'react'
import store from './redux/store'
import { ModalProvider } from './provider'
export type ReactHookModelProviderProps = {
  children: React.ReactNode
  modals: React.FunctionComponent[]
}
export const ReactHookModelProvider = ({
  children,
  modals
}: ReactHookModelProviderProps) => {
  return (
    <StoreProvider store={store}>
      <ModalProvider modals={modals}>{children}</ModalProvider>
    </StoreProvider>
  )
}
export * from './hook'
