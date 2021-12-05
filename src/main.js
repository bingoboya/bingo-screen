import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import request from './utils/request'

import 'styles/index.scss'

// import axios from "axios";
// import globalConfig from '@/config'
// axios.get(globalConfig.mockApi + '/login').then((res)=>{
//   console.log(222, res);
// })

console.log('环境变量', import.meta.env);
console.log('环境变量2', import.meta.env.VITE_APP_TITLE);
const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$abc = 'request'
app.use(router).use(store).mount('#app')
