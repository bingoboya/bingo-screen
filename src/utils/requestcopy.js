import axios from "axios";
import router from '@/router'
import Cookies from 'js-cookie'
import globalConfig from '@/config'
import qs from 'qs';
import {
  ElMessage
} from "element-plus";
const TOKEN_INVALID = 'token 认证失败'
const NETWORK_ERROR = '网络异常la'
// axios.get(globalConfig.mockApi + '/login').then((res)=>{
//   console.log(222, res);
// })

const service = axios.create({
  baseURL: globalConfig.mockApi,
  timeout: globalConfig.timeout // 请求超时时间
})

const TokenKey = 'WLY-ADMIN-TOEKN'
const getToken = () => {
  return Cookies.get(TokenKey)
}
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    const headers = config.headers
    // if(!headers.Authorization) headers.Authorization = 'Bear Jack'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // console.log('环境变量1', import.meta.env);
    const {
      MODE
    } =
    import.meta.env
    const {
      code,
      data,
      msg
    } = response.data
    if (MODE === 'production') {
      return response.data
    } else {
      return data
    }
    //  if(code === 200) {
    //  return response
    //  }else 
    if (code === 401) {
      ElMessage.error(TOKEN_INVALID)
      router.push('./401')
      return Promise.reject(TOKEN_INVALID)
    } else {
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR)
    }
  },
  // error => {
  //   // 兼容blob下载出错json提示
  //   if (error.response.data instanceof Blob && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
  //     const reader = new FileReader() 
  //     reader.readAsText(error.response.data, 'utf-8')
  //     reader.onload = function(e) {
  //       const errorMsg = JSON.parse(reader.result).message
  //       ElMessage.error({
  //         title: errorMsg,
  //         duration: 5000
  //       })
  //     }
  //   } else {
  //     let code = 0
  //     if (error.response.status === 401) {
  //       ElMessage.error({
  //         title: '账号或密码错误',
  //         duration: 3000
  //       })
  //       return Promise.reject(error)
  //     }
  //     // console.log(5555, error.response)
  //     try {
  //       code = error.response.data.status
  //     } catch (e) {
  //       if (error.toString().indexOf('Error: timeout') !== -1) {
  //         ElMessage.error({
  //           title: '网络请求超时',
  //           duration: 5000
  //         })
  //         return Promise.reject(error)
  //       }
  //     }
  //     // console.log(123123123, code)
  //     if (code) {
  //       if (code === 401) {
  //         store.dispatch('LogOut').then(() => {
  //           // 用户登录界面提示
  //           Cookies.set('point', 401)
  //           location.reload()
  //         })
  //       } else if (code === 403) {
  //         router.push({ path: '/401' })
  //       } else if (code === 208) {
  //         console.log('是不是error', error)
  //         const errorMsg = error.response.data.message
  //         ElMessage.error({
  //           title: errorMsg,
  //           duration: 3000
  //         })
  //       } else {
  //         const errorMsg = error.response.data.message
  //         if (errorMsg !== undefined) {
  //           ElMessage.error({
  //             title: errorMsg,
  //             duration: 3000
  //           })
  //         }
  //       }
  //     } else {
  //       ElMessage.error({
  //         title: '接口请求失败',
  //         duration: 5000
  //       })
  //     }
  //   }
  //   return Promise.reject(error)
  // }
)

function request(config) {
  config.method = config.method || 'get'
  if (config.method.toLowerCase() === 'get' && config.data) {
    console.log('options2:', config, config.data)
    // config.params = config.data
    // console.log('options3:', config.data)
    config.params = config.data // 参数已经存在于 url中
    config.url = config.url + '?' + qs.stringify(config.data)
  }
  if (globalConfig.env === 'prod') {
    service.defaults.baseURL = globalConfig.baseApi
  } else {
    service.defaults.baseURL = globalConfig.mock ? globalConfig.mockApi : globalConfig.baseApi
  }
  return service(config)
}

['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  request[item] = (url, data, options) => {
    console.log('options1:', qs.stringify(data))
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request