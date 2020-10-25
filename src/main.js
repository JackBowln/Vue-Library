import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import router from './router'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

Vue.config.productionTip = false
Vue.use(VueGoodTablePlugin);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
