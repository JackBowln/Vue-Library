import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/main/main.vue'
import Query from './components/query/query.vue'
import Mobile from './components/mobile/mobile.vue'
import Login from './components/register/login.vue'
import Register from './components/register/register.vue'
import store from "@/store";
Vue.use(store);
Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next({
      path: "/login",
    });
  };

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Main,
        name: 'Main',
        beforeEnter: ifAuthenticated,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/query',
        component: Query,
        name: 'Query',
        beforeEnter: ifAuthenticated,
        meta: {
            requiresAuth: true
        }
    } , {
        path: '/mobile',
        component: Mobile,
        name: 'Mobile',
        beforeEnter: ifAuthenticated,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/login',
        component: Login,
        name: 'Login',
        meta: {
            requiresAuth: false
        }
    }, {
        path: '/cadastrar',
        component: Register,
        name: 'Register',
        meta: {
            requiresAuth: false
        }
    }]
})
