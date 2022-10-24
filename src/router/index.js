

import HomeView from '../views/HomeView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import ListsView from "../views/ListsView.vue";
import ListView from "../views/ListView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import GiftsView from "../views/GiftsView.vue";
import SigninView from "../views/SigninView.vue";
import SignupView from "../views/SignupView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [

  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/lists',
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

  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router

