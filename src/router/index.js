import { createRouter, createWebHistory } from 'vue-router'
import ListsView from "../views/ListsView.vue";
import ListView from "../views/ListView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import GiftsView from "../views/GiftsView.vue";
import SigninView from "../views/SigninView.vue";
import SignupView from "../views/SignupView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'lists',
    component: ListsView,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/lists/:id',
    name: 'list',
    component: ListView,
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/gifts',
    name: 'gifts',
    component: GiftsView,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
    meta: {
      layout: 'main',
      auth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  linkActiveClass: 'nav__link_current',
  linkExactActiveClass: 'nav__link_current',
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    (to.name === 'signin' || to.name === 'signup') ? next('/') : next()
  } else {
    to.meta.auth ? next({name: 'signin'}) :  next()
  }
})

export default router

