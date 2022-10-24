<template>
  <auth-form-header
      title="Регистрация"
      alternative="Уже есть аккаунт? "
      linkTitle="Войти"
      link="/signin"/>
  <auth-form/>

</template>

<script>
import AuthFormHeader from "../components/forms/AuthFormHeader.vue";
import AuthForm from "../components/forms/AuthForm.vue";
export default {
  name: "SignupView",
  components: {AuthForm, AuthFormHeader}
}
</script>

<style scoped>

</style>
