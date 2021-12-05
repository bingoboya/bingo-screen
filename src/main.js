import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import store from './store'
import axios from 'axios'
import 'styles/index.scss'


console.log('环境变量', import.meta.env);
console.log('环境变量2', import.meta.env.VITE_APP_TITLE);
createApp(App).use(router).use(store).mount('#app')
// axios.get(config.mockApi + '/login').then((res)=>{
//   console.log(222, res);
// })