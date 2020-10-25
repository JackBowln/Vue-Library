import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/main/main.vue'
import Query from './components/query/query.vue'
import Mobile from './components/mobile/mobile.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Main
    }, {
        path: '/query',
        component: Query,
    } , {
        path: '/mobile',
        component: Mobile
    }]
})