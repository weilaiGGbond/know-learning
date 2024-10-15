import { createSlice } from '@reduxjs/toolkit'
// 用户信息
const personSlice = createSlice({
  name: 'person',
  initialState: {
    token: '',
    role: '',
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
      console.log(action, action.payload)
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = ''
    }
  }
})

export const { setToken, clearToken } = personSlice.actions
export default personSlice.reducer
