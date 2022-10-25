<template>
  <img :src="logo" alt="Логотип">
  <h1 class="section__title">{{title}}</h1>
  <span class="section__subtitle">{{alternative}}<router-link :to="link" class="section__subtitle_link">{{linkTitle}}</router-link></span>
</template>

<script>
import logo from '../../assets/image/logo.svg'

export default {
  name: "AuthFormHeader",
  props: {
    title: {
      type: String,
    },
    alternative: {
      type: String,
    },
    linkTitle: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  setup() {
    return {logo}
  }
}
</script>

<style scoped>
img {
  opacity: .6;
}
</style>
