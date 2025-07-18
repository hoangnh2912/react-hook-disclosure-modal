import React, { useMemo } from 'react'
import { useModalStore, State } from '../store'

export const ModalWrapper = ({
  modals
}: {
  modals: Record<string, React.FunctionComponent>
}) => {
  const isOpens = useModalStore((state: State) => state.modalTags)
  const modalOpened = useMemo(() => {
    return Object.entries(modals)
      .filter(([tag]) => !!isOpens[tag]?.input)
      .map(([_, Modal]) => <Modal key={Modal.name} />)
  }, [isOpens])
  return <React.Fragment>{modalOpened}</React.Fragment>
}
