import { createRouter, createWebHistory } from 'vue-router'
import MovieView from '../views/MovieView'
import SingleMovieView from '../views/SingleMovieView'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'movieView',
    component: MovieView
  },
  {
    path: '/:movieID',
    name: 'SingleMovieView',
    component: SingleMovieView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
