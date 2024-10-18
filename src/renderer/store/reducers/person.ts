import { createSlice } from '@reduxjs/toolkit'
import { deleteTokenAuth, setTokenAuth } from '@renderer/utils/auth'
// 用户信息
const personSlice = createSlice({
  name: 'person',
  initialState: {
    token: '',
    role: 0,
    avatar: '',
    username: '',
    classid: '',
    classname: '',
    count: 0
  },
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    setToken: (state, action) => {
      console.log('2222' );
      setTokenAuth(action.payload)
      state.token = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    clearToken: (state) => {
      state.token = ''
      deleteTokenAuth()
    }
  }
})

export const { setToken, clearToken } = personSlice.actions
export default personSlice.reducer
