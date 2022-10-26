<template>
  <h3 class="section__title">Данные категории</h3>
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
    </div>
    <button
        class="form__button"
        type="submit"
        :disabled="isSubmitting || errorMessage "
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
import {toRef} from "vue";

const CATEGORY_NAME_MIN_LENGTH = 2
const CATEGORY_NAME_MAX_LENGTH = 100

export default {
  name: "CategoryForm",
  props: {onSubmit: { type: Function}, name},
  setup(props) {

    const {name} = toRef(props);

    const { handleSubmit, isSubmitting } = useForm()

    const { value, errorMessage, handleBlur} = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите название категории')
            .min(CATEGORY_NAME_MIN_LENGTH, `Название не может быть короче ${CATEGORY_NAME_MIN_LENGTH} символов`)
            .max(CATEGORY_NAME_MAX_LENGTH, `Название не может быть длиннее ${CATEGORY_NAME_MAX_LENGTH} символов`)
            .matches(/^[-\p{L} _\d]+$/u)
    );

    if (props.name) {
      value.value = props.name;
    }

    const onSubmit = handleSubmit(props.onSubmit)

    return {
      value,
      errorMessage,
      handleBlur,
      isSubmitting,
      onSubmit, name
    }
  }
}
</script>

<style scoped>

</style>
