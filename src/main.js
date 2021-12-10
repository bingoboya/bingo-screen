import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import request from './utils/request'
import globalConfig from "@/config";
import {Edit, Camera, Sugar} from '@element-plus/icons'
import Antd from 'ant-design-vue';
// import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import 'styles/index.scss'

// import axios from "axios";
// import globalConfig from '@/config'
// axios.get(globalConfig.mockApi + '/login').then((res)=>{
//   console.log(222, res);
// })

console.log('环境变量', import.meta.env, globalConfig);
const app = createApp(App)
app.component('edit', Edit)
app.component('camera', Camera)
app.component('sugar', Sugar)

// app.use(DatePicker);

app.config.globalProperties.$request = request
app.config.globalProperties.$abc = 'request'
app.use(router).use(Antd).use(store).mount('#app')
