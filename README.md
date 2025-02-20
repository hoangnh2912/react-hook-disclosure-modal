# react-hook-disclosure-modal

[![NPM](https://img.shields.io/npm/v/react-hook-disclosure-modal.svg)](https://www.npmjs.com/package/react-hook-disclosure-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-hook-disclosure-modal
```

## Usage

```tsx
import React from 'react'
import {
  ReactHookModalProvider,
  useDisclosure
} from 'react-hook-disclosure-modal'

const ModalOne = () => {
  const { isOpen, onClose } = useDisclosure({
    tag: ModalOne.name
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Modal One
    </Modal>
  )
}

const ModalTwo = () => {
  const { isOpen, onClose } = useDisclosure({
    tag: ModalTwo.name
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      Modal Two
    </Modal>
  )
}

const modals = [ModalOne, ModalTwo]

const App = () => {
  const { onOpen: onOpenOne } = useDisclosure({
    tag: ModalOne.name
  })

  const { onOpen: onOpenTwo } = useDisclosure({
    tag: ModalTwo.name
  })

  return (
    <ReactHookModalProvider modals={modals}>
      Hello world
      <Button onClick={onOpenOne}>Open Modal One</Button>
      <Button onClick={onOpenTwo}>Open Modal Two</Button>
    </ReactHookModalProvider>
  )
}
```

## License

MIT © [hoangnh2912](https://github.com/hoangnh2912)
