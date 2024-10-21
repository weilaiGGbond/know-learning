import { createSlice } from '@reduxjs/toolkit'
import { deleteTokenAuth, setTokenAuth } from '@renderer/utils/auth'
// 用户信息
const websocketStore = createSlice({
  name: 'socket',
  initialState: {
    socketConnect:''
  
  },
  reducers: {
    setNewConnect: (state, action) => {
      console.log(action.payload);
    const socketio = new WebSocket(`ws://81.70.144.36:8080/ws/audit?token=${action.payload}`)
    state.socketConnect=JSON.stringify(socketio)
    console.log(JSON.parse(state.socketConnect),'88888');
    },
  }
})
export const { setNewConnect } = websocketStore.actions;
export default websocketStore.reducer;
