import { useEffect } from 'react'
import { TagType } from './tag'
import { useModalStore, useModalActions } from '../store'

export type Any = string | number | boolean | object | undefined | Record<string, any>

export interface DisclosureHookProps<O> {
  tag: TagType
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

  const inputState = useModalStore(
    (state) => state.modalTags[tag]?.input
  ) as Input
  const outputState = useModalStore(
    (state) => state.modalTags[tag]?.output
  ) as Output
  const clearDisclosureTag = useModalActions(
    (actions) => actions.clearModalTag
  )

  const onOpenAction = useModalActions((actions) => actions.openModal)
  const okAction = useModalActions((actions) => actions.okModal)
  const onCloseAction = useModalActions((actions) => actions.closeModal)
  const onToggleAction = useModalActions((actions) => actions.toggleModal)

  const updateInput = (input?: Input) => {
    // If input is a function, call it and set the result as input
    if (input && typeof input == 'object' && 'preventDefault' in input) {
      input = undefined
    }
    onOpenAction(tag, input as Any)
  }

  const onOpen = (input?: Input) => {
    updateInput(input)
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
      onOpen(inputState as Input)
    } else {
      onClose()
    }
    return () => {
      clearDisclosureTag(tag)
    }
  }, [inputState])

  useEffect(() => {
    if (outputState) {
      onOk(outputState as Output)
    }
  }, [outputState])

  const onOk = (output?: Output) => {
    disclosureHook?.onOk?.(output)
    okAction(tag, output as Any)
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
    onChange,
    updateInput
  }
}
