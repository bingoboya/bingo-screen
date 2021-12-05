const env = import.meta.env.MODE || 'prod'
console.log(env);
const EnvConfig = {
  development: {
    mock: true,
    timeout: 8000,
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/23a93d9800a894dc5f7bff1d4412b2b8/api'
  },
  test: {
    mock: true,
    timeout: 8000,
    baseApi: '//test.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/23a93d9800a894dc5f7bff1d4412b2b8/api'
  },
  prod: {
    mock: false,
    timeout: 8000,
    baseApi: '//futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/23a93d9800a894dc5f7bff1d4412b2b8/api'
  }
}
export default {
  env,
  ...EnvConfig[env]
}