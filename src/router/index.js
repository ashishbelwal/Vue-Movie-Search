import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index'
import Movie from '../views/movie'
import Login from '../components/auth/Login'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Index
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
