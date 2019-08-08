import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('@/views/test.vue')
  // },
  // {
  //   path: '/darg',
  //   name: 'darg',
  //   component: () => import('@/views/darg.vue')
  // },
  {
    path: '/',
    name: 'elHome',
    component: () => import('@/views/elHome.vue')
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

// router.afterEach(() => {
//   const splashScreen = document.querySelector('.app-splash-screen')
//   if (splashScreen) {
//     splashScreen.getElementsByClassName.opacity = 0
//     setTimeout(() =>
//       splashScreen && splashScreen.parentNode && splashScreen.parentNode.removeChild(splashScreen)
//       , 1000)
//   }
// })

export default router
