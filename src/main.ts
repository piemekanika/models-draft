import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
import NwForm from './components/nw-form.vue'
import NwFormLine from './components/nw-form-line.vue'

Vue.component('nw-form', NwForm)
Vue.component('nw-form-line', NwFormLine)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

