import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Defending from '../views/Defending.vue'
import Visualize from '../views/Visualize.vue'
import Messaging from '../views/Messaging.vue'
import LogIn from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store/index.js'



Vue.use(VueRouter)
let isAuthenticated = localStorage.getItem("isAuthenticated");

const routes = [
  {
    path: '/',
    name: 'accueil',
    component: () => {
      if (store.state.isAuthenticated === true) {
        return Home
      } else {
        return LogIn
      }
    }
  },
  {
    path: '/accueil',
    name: 'Home',
    component: Home,
  },

  {
    path: '/visualize',
    name: 'Visualize',
    component: Visualize
  },
  {
    path: '/messaging',
    name: 'Messaging',
    component: Messaging,
  },
  {
    path: '/defending',
    name: 'Defending',
    component: Defending,
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/" && (isAuthenticated ===true)) {
    next("/accueil");

  } else if (to.path === "/" && (isAuthenticated === null || isAuthenticated ===false)) {
    next("/login");
  }
  if (to.path === "/login" && (isAuthenticated !== null && isAuthenticated !== false)) {
    next("/accueil");
  }
  // eslint-disable-next-line
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'login', query: { to: to.path } });
  } else {
     next()
  }
})


export default router
