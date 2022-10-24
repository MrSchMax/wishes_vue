<template>
  <form class="form" name="form" @submit.prevent="onSubmit">
    <div class="form-inputs">
      <label for="email">
        <input
            class="form__field form__field_top"
            type="email"
            name="email"
            id="email"
            required
            placeholder="E-mail"
            v-model="email"
            @blur="eBlur"
            :disabled="isSubmitting"
        />
      </label>
      <label for="password">
        <input
            class="form__field form__field_bottom"
            type="password"
            name="password"
            id="password"
            required
            minLength="8"
            placeholder="Пароль"
            v-model="password"
            @blur="pBlur"
            :disabled="isSubmitting"
        />
      </label>
    </div>
    <button
        class="form__button"
        type="submit"
        :disabled="isSubmitting || pError || eError"
    >Отправить</button>

    <div class="message" :class="[{hidden: !pError&&!eError}]">
      <h2 class="message__title">Присутствуют ошибки ввода данных:</h2>
      <ul class="message__list">
        <li class="message__text" v-if="eError">{{eError}}</li>
        <li class="message__text" v-if="pError">{{pError}}</li>
      </ul>
    </div>
  </form>
</template>

<script >
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "AuthForm",
  setup() {
    const router = useRouter();
    const store = useStore();

    const { handleSubmit, isSubmitting } = useForm()

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите email')
            .email('Необходимо ввести корректный email')
    );

    const PASSWORD_MIN_LENGTH = 8;
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите пароль')
            .min(PASSWORD_MIN_LENGTH, `Пароль не может быть короче ${PASSWORD_MIN_LENGTH} символов`))

    const onSubmit = handleSubmit(async values => {
      const isSuccess = await store.dispatch('auth/login', values);
      if (isSuccess) { await router.push('/'); }
    })

    return {
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      isSubmitting,
      onSubmit,
    }
  }
}
</script>

<style scoped>
.message {
  min-height: 72px;
}
.hidden {
  opacity: 0;
}
</style>
