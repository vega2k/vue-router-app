import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Posts from './views/Posts.vue'
import PostNew from './views/PostNew.vue'
import PostDetail from './views/PostDetail.vue'
import Login from './views/Login.vue'
import {Auth} from './api'

Vue.use(Router)

const requireAuth = (to, from, next) => {
  if (Auth.loggedIn()) return next()
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
}

export default new Router({
  routes: [
    { path: '/', name: 'home',component: Home },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    { path: '/login', component: Login },
    { path: '/logout', 
      beforeEnter(to, from, next) {
        Auth.logout()
        next('/')
      } 
    },
    { path: '/posts',
      component: Posts,

      // 중첩된 라우트는 children 속성으로 하위 라우트를 정의할 수 있다.
      children: [
        { path: 'new', component: PostNew, beforeEnter: requireAuth },
        { name: 'post', path: ':id', component: PostDetail }
      ]
    }
  ]
})
