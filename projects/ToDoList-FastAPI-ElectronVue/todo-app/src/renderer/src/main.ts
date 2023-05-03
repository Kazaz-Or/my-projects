import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(VueAxios, axios).mount('#app')
