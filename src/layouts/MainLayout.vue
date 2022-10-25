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

</style>
