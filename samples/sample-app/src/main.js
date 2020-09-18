import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ImageKit from "../../../src";

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/demo"
})

new Vue({
  render: h => h(App),
}).$mount('#app')
