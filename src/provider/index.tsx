import React, {
  useMemo
} from 'react'
import { useStoreState } from '../redux/hook'

export const ModalWrapper = ({
  modals
}: {
  modals: Record<string, React.FunctionComponent>
}) => {
  const isOpens = useStoreState((state) => state.modal.modalTags)
  const modalOpened = useMemo(() => {
    return Object.entries(modals)
      .filter(([tag]) => !!isOpens[tag]?.input)
      .map(([_, Modal]) => <Modal
        key={Modal.name}
      />)
  }, [isOpens])
  return (
    <React.Fragment>
      {modalOpened}
    </React.Fragment>
  )
}