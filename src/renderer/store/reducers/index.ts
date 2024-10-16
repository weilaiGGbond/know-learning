import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import personReducer from './person'
import electronStorage from '../electron-store'

// 组合 reducer
const rootReducer = combineReducers({
  personReducer: personReducer
  // 其他 reducers...
})
// 定义 persist 配置
const persistConfig = {
  key: 'root',
  storage: electronStorage,
  whitelist: ['personReducer']
}
// 将 persistReducer 应用于整个 rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer
