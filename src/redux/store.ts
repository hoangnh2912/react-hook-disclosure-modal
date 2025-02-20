import { createStore } from 'easy-peasy'
import type { StoreModel } from './models'
import { modal } from './stores'

const model: StoreModel = {
  modal
}

const store = createStore<StoreModel>(model)

export default store
