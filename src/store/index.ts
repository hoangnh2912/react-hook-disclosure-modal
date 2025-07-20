import { Store, useStore } from "@tanstack/react-store";

// You can instantiate the store outside of React components too!

import { Any } from '../hook'

export type State = {
  modalTags: {
    [tag: string]: {
      input?: Any
      output?: Any
    }
  }
}

export type Action = {
  openModal: (tag: string, input?: Any) => void
  okModal: (tag: string, output?: Any) => void
  closeModal: (tag: string) => void
  toggleModal: (tag: string) => void
  clearModalTag: (tag: string) => void
  clearAllModalTags: () => void
}
export const store = new Store<State>({
  modalTags: {}
});


const openModal = (tag: string, input?: Any) => {
  store.setState((state) => ({
    modalTags: {
      ...state.modalTags,
      [tag]: {
        ...state.modalTags[tag],
        input: input ?? true // Default to true if no input is provided
      }
    }
  }))
}
const okModal = (tag: string, output?: Any) => {
  store.setState((state) => ({
    modalTags: {
      ...state.modalTags,
      [tag]: {
        ...state.modalTags[tag],
        output
      }
    }
  }))
}
const closeModal = (tag: string) => {
  store.setState((state) => ({
    modalTags: {
      ...state.modalTags,
      [tag]: { input: false }
    }
  }))
}
const toggleModal = (tag: string) => {
  store.setState((state) => ({
    modalTags: {
      ...state.modalTags,
      [tag]: {
        ...state.modalTags[tag],
        input: !state.modalTags[tag]?.input
      }
    }
  }))
}
const clearModalTag = (tag: string) => {
  store.setState((state) => {
    const newModalTags = { ...state.modalTags };
    delete newModalTags[tag];
    return { modalTags: newModalTags };
  })
}
const clearAllModalTags = () => {
  store.setState(() => ({ modalTags: {} }))
}

export const useModalStore = <T>(
  stateCallback: (state: State) => T,
): T => {
  return useStore(store, stateCallback)
}

export const useModalActions = <T>(
  actionCallback: (action: Action) => T
): T => {
  return actionCallback(
    {
      openModal,
      okModal,
      closeModal,
      toggleModal,
      clearModalTag,
      clearAllModalTags
    }
  )
}