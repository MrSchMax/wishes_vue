<template>
  <auth-form-header
      title="Войдите в аккаунт"
      alternative="Или создайте новый: "
      linkTitle="Регистрация"
      link="/signup"/>
  <auth-form :on-submit="handlerSubmit"/>
</template>

<script>
import AuthFormHeader from "../components/forms/AuthFormHeader.vue";
import AuthForm from "../components/forms/AuthForm.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "SigninView",
  components: {AuthForm, AuthFormHeader},
  setup() {
    const router = useRouter();
    const store = useStore();

    const handlerSubmit = async values => {
      const isSuccess = await store.dispatch('auth/login', values);
      if (isSuccess) { await router.push('/'); }
    }

    return {handlerSubmit}
  }
}
</script>

<style scoped>

</style>
