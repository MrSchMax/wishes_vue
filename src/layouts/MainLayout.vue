<template>
  <button @click.prevent="$store.commit('auth/logout')">Выйти</button>
  <main>
    <router-view/>
  </main>
</template>

<script>
export default {
  name: "MainLayout"
}
</script>

<style scoped>

</style>
