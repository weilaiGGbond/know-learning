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
    count: 0,
    userInfo: {
      username: '',
      name: '',
      sex: 0,
      stuClass: '',
    }
  },
  reducers: {
    increment: (state, action) => {
      console.log(action.payload)
    },
    decrement: (state) => {
      state.count -= 1
    },
    setToken: (state, action) => {
      setTokenAuth(action.payload)
      state.token = action.payload
    },
    setRole: (state, action) => {
      state.role = action.payload
    },
    setUserownName: (state, action) => {
      state.username = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    clearToken: (state) => {
      state.token = ''
      deleteTokenAuth()
    }
  }
})

export const { setToken, clearToken, setUserownName, setUserInfo } = personSlice.actions
export default personSlice.reducer
