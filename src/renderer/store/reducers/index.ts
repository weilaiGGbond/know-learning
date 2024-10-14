// reducers/index.js
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import counterReducer from './person'
import electronStorage from '../electron-store'

const rootReducer = combineReducers({
  counter: counterReducer
  // 其他 reducers...
})
const persistConfig = {
  key: 'root',
  storage: electronStorage,
  whitelist: ['counter']
}
console.log(persistReducer)

const persistedReducer = persistReducer(persistConfig, counterReducer)
export default persistedReducer
