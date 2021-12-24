import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import request from './utils/request'
import globalConfig from "@/config";
// import SocketIO from './plugins/io'
import Antd from 'ant-design-vue';
// import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import 'styles/index.scss'


console.log('环境变量', import.meta.env, globalConfig);
const app = createApp(App)


// app.use(DatePicker);
// app.use(SocketIO, {
//   connection: 'http://222.128.19.51:7001',
//   // connection: 'ws://localhost:8082',
// })



app.config.globalProperties.$request = request
app.config.globalProperties.$abc = 'request'
app.use(router).use(Antd).use(store).mount('#app')
