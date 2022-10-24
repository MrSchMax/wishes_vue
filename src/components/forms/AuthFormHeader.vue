<template>
  <h1 class="section__title">{{title}}</h1>
  <span class="section__subtitle">{{alternative}}<router-link :to="link" class="section__subtitle_link">{{linkTitle}}</router-link></span>
</template>

<script>
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
}
</script>

<style scoped>

</style>
