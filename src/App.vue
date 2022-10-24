<script >
import MainLayout from "./layouts/MainLayout.vue";
import {computed} from "vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  name: "App",
  components: {MainLayout, AuthLayout}
}
</script>

<template>
  <component :is="layout + '-layout'"  v-if="layout"></component>
</template>
