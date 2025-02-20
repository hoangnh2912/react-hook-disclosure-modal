import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useMemo
} from 'react'
import { useStoreState } from '../redux/hook'
type ModalContextType = {
  modals: Array<ReactNode>
}
const ModalContext = createContext<ModalContextType>({
  modals: []
})
export const ModalProvider = ({
  children,
  modals
}: {
  children: ReactNode
  modals: Array<FunctionComponent>
}) => {
  const isOpens = useStoreState((state) => state.modal.modalTags)
  const modalOpened = useMemo(() => {
    return Object.entries(modals)
      .filter(([tag]) => !!isOpens[tag]?.input)
      .map(([_, modal]) => modal)
  }, [isOpens])
  return (
    <ModalContext.Provider value={{ modals }}>
      {children}
      {modalOpened}
    </ModalContext.Provider>
  )
}

export default ModalContext
