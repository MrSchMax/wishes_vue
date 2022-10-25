<template>
  <auth-form-header
      title="Регистрация"
      alternative="Уже есть аккаунт? "
      linkTitle="Войти"
      link="/signin"/>
  <auth-form :on-submit="handlerSubmit"/>

</template>

<script>
import AuthFormHeader from "../components/forms/AuthFormHeader.vue";
import AuthForm from "../components/forms/AuthForm.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
export default {
  name: "SignupView",
  components: {AuthForm, AuthFormHeader},
  setup() {
    const router = useRouter();
    const store = useStore();

    const handlerSubmit = async values => {
      const isSuccess = await store.dispatch('auth/signup', values);
      if (isSuccess && await store.dispatch('auth/signin', values)) {
        await router.push({name: 'signin'});
      }
    }

    return {handlerSubmit}
  }
}
</script>

<style scoped>

</style>
