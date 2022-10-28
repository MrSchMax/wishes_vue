<script >
import MainLayout from "./layouts/MainLayout.vue";
import {computed} from "vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const message = computed(() => store.getters['message/getMessage']);
    const close = () => store.commit('message/clearMessage');
    return {
      layout: computed(() => route.meta.layout),
      message,
      close
    }
  },
  name: "App",
  components: {MainLayout, AuthLayout}
}
</script>

<template>
  <component :is="layout + '-layout'"  v-if="layout"></component>
  <teleport to="body">
    <div class="message-info" :class="[message.type]" v-if="message">
      <span class="message-info__title">{{message.title}}</span>
      <span>{{ message.text }}</span>
      <span class="button-close" @click.prevent="close">&times;</span>
    </div>
  </teleport>
</template>

<style>
.message-info {
  padding: 16px;
  margin: 20px auto 0;
  width: 100%;
  max-width: 610px;
  position: fixed;
  box-sizing: border-box;
  text-align: center;
  z-index: 900;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 10px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, .3);
}

.message-info__title {
  font-weight: 700;
}

.danger {
  background: #fddfdf;
  color: rgb(139, 0, 0);
}
.success {
  background: #dcfce7;
  color: #047857;
}
</style>
