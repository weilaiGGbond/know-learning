import { getTokenAuth } from "@renderer/utils/auth";
import { useEffect, useRef, useState } from "react";
type Message = {
  type: string,
  data: any
}
type WebSocketOptions = {
  url: string;
  onOpen?: () => void;
  onClose?: (event: Event) => void;
  onError?: (event: Event) => void;
  onMessage?: (message: any) => void;
  reconnectInterval?: number;
  reconnectAttempts?: number;
};
const defaultOptions: Required<WebSocketOptions> = {
  url: '',
  onOpen: () => { },
  onClose: () => { },
  onError: () => { },
  onMessage: () => { },
  reconnectInterval: 1000,
  reconnectAttempts: Number.MAX_VALUE,
};
const useWebSocket = (
  options: WebSocketOptions,
): [WebSocket | undefined, (message: any) => void, string, boolean] => {
  const { url, onOpen, onClose, onError, onMessage, reconnectInterval, reconnectAttempts } = { ...defaultOptions, ...options }

  const [isConnected, setIsConnected] = useState(false)//是否连接
  const [reconnectAttempt, setReconnectAttempt] = useState(0)//判断重新连接
  const socketRef = useRef<WebSocket | undefined>(undefined)
  const reconnectTimeRef = useRef<NodeJS.Timer>()
  const [lastMessage, setLastMessage] = useState('');//最新的消息

  const getToken = (async () => {
    const tokendata = await getTokenAuth()
    return tokendata
  })
  //连接函数
  const connect = async () => {
    const dataToken = await getToken();
    console.log(dataToken,'855555555');
    setIsConnected(false)
    const socket = new WebSocket(url)
    socket.onopen = () => {
      console.log('已经连接websocket');
      setIsConnected(true)
      setReconnectAttempt(0)
      onOpen()
    }
    socket.onclose = (event) => {
      setIsConnected(false)
      onClose(event)

      if (reconnectAttempt < reconnectAttempts) {
        reconnectTimeRef.current = setTimeout(() => {
          setReconnectAttempt((precount) => precount + 1)
          connect()
        }, reconnectInterval)
      }

    }
    socket.onerror = (event) => {
      console.log('websocket error', event);
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log(`Websocket 接收到消息：${message}`);
      setLastMessage(message)
      onMessage(message)
    }
    socketRef.current = socket


  }
  useEffect(() => {
    connect()
    return () => {
      socketRef.current?.close()
      clearTimeout(reconnectTimeRef.current)
    }
  }, [])
  const sendMessage = (message: any) => {
    if (isConnected && socketRef.current) {
      console.log('发送消息');
      socketRef.current.send(JSON.stringify(message))
    } else {
      console.log('没连接');
    }
  }
  return [socketRef.current, sendMessage, lastMessage, isConnected]
}
export default useWebSocket