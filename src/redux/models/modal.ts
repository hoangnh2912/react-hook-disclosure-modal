import type { Action } from 'easy-peasy'

type ModalTagInput = {
  tag: string
  input?: any
}
type ModalTagOutput = {
  tag: string
  output?: any
}

interface ModalTag {
  modalTags: {
    [tag: string]: {
      input?: any
      output?: any
    }
  }
  okModal: Action<ModalTag, ModalTagOutput>
  openModal: Action<ModalTag, ModalTagInput>
  closeModal: Action<ModalTag, string>
  toggleModal: Action<ModalTag, string>
  clearModalTag: Action<ModalTag, string>
  clearAllModalTags: Action<ModalTag>
}

export type { ModalTag }
