<template>
  <main>
    <section class="section">
      <RouterView/>
    </section>
  </main>
</template>

<script>
export default {
  name: "AuthLayout",
}
</script>

<style scoped>
.section {
  justify-content: center;
  min-height: 100vh;
}
</style>
