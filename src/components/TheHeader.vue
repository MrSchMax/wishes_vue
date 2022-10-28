<template>
  <header class="header">

    <img class="header__logo" :src="logo" alt="Логотип" @click.prevent="$router.push({name: 'lists'})">
    <nav class="header__nav" v-if="isAuthenticated">
      <ul class="nav">
        <li class="nav__item">
          <router-link class="nav__link" :to="{name: 'categories'}">Категории</router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{name: 'gifts'}">Подарки</router-link>
        </li>
        <li class="nav__item">
          <router-link class="nav__link" :to="{name: 'lists'}">Списки</router-link>
        </li>
      </ul>
    </nav>
    <button class="button button_outline" v-if="isAuthenticated" @click.prevent="logout">Выйти</button>
    <div class="header__auth" v-else>
      <router-link class="button button_outline" :to="{name: 'signup'}">Регистрация</router-link>
      <router-link class="button" :to="{name: 'signin'}">Вход</router-link>
    </div>
  </header>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import logo from '../assets/image/logo.svg'

const router = useRouter();
const store = useStore();

const isAuthenticated = store.getters['auth/isAuthenticated'];

const logout = () => {
  store.commit('auth/logout');
  router.push({name: 'signin'});
}
</script>

<style scoped>

</style>
