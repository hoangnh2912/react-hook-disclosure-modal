import { useEffect } from 'react'
import { useStoreActions, useStoreState } from '../redux/hook'

export type Any = string | number | boolean | object | undefined | Record<string, any>

export interface DisclosureHookProps<O> {
  tag: string
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  onToggle?: () => void
  onChange?: (isOpen: boolean) => void
  onOk?: (output?: O) => void
  onCancel?: () => void
}

export const useDisclosure = <Input = Any, Output = Any>(
  disclosureHook: DisclosureHookProps<Output>
) => {
  const tag = disclosureHook.tag

  const inputState: Input = useStoreState(
    (state) => state.modal.modalTags[tag]?.input
  )
  const outputState = useStoreState(
    (state) => state.modal.modalTags[tag]?.output
  )
  const clearDisclosureTag = useStoreActions(
    (actions) => actions.modal.clearModalTag
  )

  const onOpenAction = useStoreActions((actions) => actions.modal.openModal)
  const okAction = useStoreActions((actions) => actions.modal.okModal)
  const onCloseAction = useStoreActions((actions) => actions.modal.closeModal)
  const onToggleAction = useStoreActions((actions) => actions.modal.toggleModal)
  const onOpen = (input?: Input) => {
    // If input is a function, call it and set the result as input
    if (input && typeof input == 'object' && 'preventDefault' in input) {
      input = undefined
    }
    onOpenAction({
      tag,
      input
    })
    disclosureHook?.onOpen?.()
  }
  const onClose = () => {
    onCloseAction(tag)
    disclosureHook?.onClose?.()
  }
  const onToggle = () => {
    onToggleAction(tag)
    disclosureHook?.onToggle?.()
  }

  useEffect(() => {
    if (inputState) {
      onOpen(inputState)
    } else {
      onClose()
    }
    return () => {
      clearDisclosureTag(tag)
    }
  }, [inputState])

  useEffect(() => {
    if (outputState) {
      onOk(outputState)
    }
  }, [outputState])

  const onOk = (output?: Output) => {
    disclosureHook?.onOk?.(output)
    okAction({
      tag,
      output
    })
  }

  const onChange = (isOpen: boolean) => {
    if (isOpen) {
      onOpen()
    } else {
      onClose()
    }
    disclosureHook && disclosureHook.onChange && disclosureHook.onChange(isOpen)
  }

  return {
    isOpen: !!inputState,
    input: typeof inputState === 'boolean' ? undefined : inputState,
    onOpen,
    onClose,
    onToggle,
    onOk,
    onChange
  }
}
