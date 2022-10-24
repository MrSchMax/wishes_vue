<template>
  <auth-form-header
      title="Войдите в аккаунт"
      alternative="Или создайте новый: "
      linkTitle="Регистрация"
      link="/signup"/>
  <auth-form/>
</template>

<script>
import AuthFormHeader from "../components/forms/AuthFormHeader.vue";
import AuthForm from "../components/forms/AuthForm.vue";
export default {
  name: "SigninView",
  components: {AuthForm, AuthFormHeader}
}
</script>

<style scoped>

</style>
