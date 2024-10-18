import { createSlice } from '@reduxjs/toolkit'
import { deleteTokenAuth, setTokenAuth } from '@renderer/utils/auth'
// 用户信息
const websocketStore = createSlice({
  name: 'socket',
  initialState: {
  
  },
  reducers: {
    setNewConnect: (state, action) => {
      console.log(action);
    
    },
  }
})
export const { setNewConnect } = websocketStore.actions;
export default websocketStore.reducer;
