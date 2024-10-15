import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import counterReducer from './person'
import electronStorage from '../electron-store'

// 定义 persist 配置
const persistConfig = {
  key: 'root',
  storage: electronStorage, // 使用 electron-store
  whitelist: ['counter'] // 仅持久化 counter 状态
}

// 组合 reducer
const rootReducer = combineReducers({
  counter: counterReducer
  // 其他 reducers...
})

// 将 persistReducer 应用于整个 rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
