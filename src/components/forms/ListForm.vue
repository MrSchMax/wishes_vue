<template>
  <h3 class="section__title">Данные списка</h3>
  <form class="form" name="form" @submit.prevent="onSubmit">
    <div class="form-inputs">
      <label for="name">
        <input
            class="form__field form__field_bottom form__field_top"
            type="text"
            name="name"
            id="name"
            placeholder="Название"
            v-model="value"
            @blur="handleBlur"
            :disabled="isSubmitting"
        />
      </label>
      <div class="toggle-wrapper" @click.prevent="isPublic = !isPublic" >
        <span class="toggle-wrapper__text">Доступен по ссылке: </span>
        <div class="toggle">
          <input
              name="public"
              id="public"
              class="toggle__invisible"
              type="checkbox"
              value="true"
              v-model="isPublic"
          />
          <label for="toggle" class="toggle__checkbox"></label>
          <span class="toggle__background"></span>
        </div>
      </div>
    </div>
    <button
        class="form__button"
        type="submit"
        :disabled="isSubmitting || errorMessage"
    >Отправить</button>

    <div class="message" v-if="errorMessage">
      <h2 class="message__title">Присутствуют ошибки ввода данных:</h2>
      <ul class="message__list">
        <li class="message__text">{{errorMessage}}</li>
      </ul>
    </div>
  </form>
</template>

<script>
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

const LIST_NAME_MIN_LENGTH = 2
const LIST_NAME_MAX_LENGTH = 100

export default {
  name: "ListForm",
  props: {onSubmit: { type: Function}, current: {default: null}},
  setup(props) {
    const store = useStore();

    onMounted( async () => {
      await Promise.all(
          [
              store.dispatch('gift/load'), store.dispatch('category/load')
          ]
      )
        }
    )
    const { handleSubmit, isSubmitting } = useForm()

    const { value, errorMessage, handleBlur} = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите название списка')
            .min(LIST_NAME_MIN_LENGTH, `Название не может быть короче ${LIST_NAME_MIN_LENGTH} символов`)
            .max(LIST_NAME_MAX_LENGTH, `Название не может быть длиннее ${LIST_NAME_MAX_LENGTH} символов`)
            .matches(/^[-\p{L} _\d]+$/u)
    );
    const isPublic = ref(false);

    if (props.current) {
      value.value = props.current.name;
      isPublic.value = props.current.public;
    }

    const onSubmit = handleSubmit(  async values => {
      values = {...values, public: isPublic.value}
      console.log(values);
      if (props.current) {
        if (props.current.name === values.name && props.current.public === values.public) {
          return props.onSubmit(null);
        }
        values.id = props.current.id
      }
      return props.onSubmit(values);
    })

    return {
      value,
      errorMessage,
      handleBlur,
      isPublic,
      isSubmitting,
      onSubmit, name
    }
  }
}
</script>

<style scoped>

</style>
