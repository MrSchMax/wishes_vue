<template>
  <the-header/>
  <main>
    <router-view/>
  </main>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
export default {
  name: "MainLayout",
  components: {TheHeader}
}
</script>

<style scoped>
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
