import { configureStore } from '@reduxjs/toolkit'

import persistedReducer from './reducers'
import { persistStore } from 'redux-persist'
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})
export const persistor = persistStore(store)
export default store
