import { StoreProvider } from 'easy-peasy'
import * as React from 'react'
import store from './redux/store'
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
    <StoreProvider store={store}>
      <ModalWrapper modals={modals} />
      {children}
    </StoreProvider>
  )
}
export * from './hook'
