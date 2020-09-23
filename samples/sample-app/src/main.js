import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ImageKit from "imagekitio-vue"

Vue.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT
})

new Vue({
  render: h => h(App),
}).$mount('#app')
