import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, Canceler } from 'axios'
import { notification, Spin } from 'antd'
import { getTokenAuth } from '@renderer/utils/auth'
interface CustomOptions {
  loading: boolean
  repeat_request_cancel: boolean
  reduct_data_format: boolean
  error_message_show: boolean
  code_message_show: boolean
}

const pendingMap: Map<string, Canceler> = new Map()
const loadingInstance = {
  _target: null as any,
  _count: 0
}

async function myAxios(axiosConfig: AxiosRequestConfig, customOptions?: Partial<CustomOptions>) {
  const service = axios.create({
    baseURL: 'http://81.70.144.36:8080',
    timeout: 10000
  })
  const custom_options: CustomOptions = {
    loading: false,
    repeat_request_cancel: true,
    reduct_data_format: true,
    error_message_show: true,
    code_message_show: false,
    ...customOptions
  }
  service.interceptors.request.use(
    async (config) => {
      removePending(config)
      if (custom_options.repeat_request_cancel) {
        addPending(config)
      }
      if (custom_options.loading) {
        loadingInstance._count++
        if (loadingInstance._count === 1) {
          loadingInstance._target = <Spin />
        }
      }
      if (getTokenAuth() && config.url !== '/login') {
        config.headers.Authorization = getTokenAuth()
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => {
      removePending(response.config)
      if (custom_options.loading) closeLoading(custom_options)
      if (custom_options.code_message_show && response.data && response.data.code !== 0) {
        notification.error({
          message: '错误',
          description: response.data.message
        })
        return Promise.reject(response.data)
      }
      return custom_options.reduct_data_format ? response.data : response
    },
    (error) => {
      if (error.config) removePending(error.config)
      if (custom_options.loading) closeLoading(custom_options)
      if (custom_options.error_message_show) httpErrorStatusHandle(error)
      return Promise.reject(error)
    }
  )

  return service(axiosConfig)
}
function closeLoading(_options: CustomOptions) {
  if (_options.loading && loadingInstance._count > 0) loadingInstance._count--
  if (loadingInstance._count === 0 && loadingInstance._target) {
    loadingInstance._target = null
  }
}
function addPending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}
function removePending(config: InternalAxiosRequestConfig<any>) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancel = pendingMap.get(pendingKey)
    cancel && cancel(pendingKey)
    pendingMap.delete(pendingKey)
  }
}
function getPendingKey(config: InternalAxiosRequestConfig<any>) {
  let { url, method, params, data } = config
  if (typeof data === 'string') data = JSON.parse(data)
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
function httpErrorStatusHandle(error: any) {
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.message)
  let messageString = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        messageString = '接口重定向了！'
        break
      case 400:
        messageString = '参数不正确！'
        break
      case 401:
        messageString = '您未登录，或者登录已经超时，请先登录！'
        break
      case 403:
        messageString = '您没有权限操作！'
        break
      case 404:
        messageString = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        messageString = '请求超时！'
        break
      case 409:
        messageString = '系统已存在相同数据！'
        break
      case 500:
        messageString = '服务器内部错误！'
        break
      case 501:
        messageString = '服务未实现！'
        break
      case 502:
        messageString = '网关错误！'
        break
      case 503:
        messageString = '服务不可用！'
        break
      case 504:
        messageString = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        messageString = 'HTTP版本不受支持！'
        break
      default:
        messageString = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) messageString = '网络请求超时！'
  if (error.message.includes('Network'))
    messageString = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  notification.error({
    message: '错误',
    description: messageString
  })
}

export default myAxios
