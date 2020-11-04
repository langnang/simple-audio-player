import Vue from 'vue'
import './plugins/axios'
import './plugins/fontawesome'
import './plugins/element.js'
import App from './App.vue'
import router from './routes'
import store from './store'

import AudioPlayer from "./../../92xx_vue-audio-player/src/audio-player/index";

Vue.use(AudioPlayer);

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
