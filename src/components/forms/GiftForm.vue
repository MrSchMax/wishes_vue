<template>
  <h3 class="section__title">Данные подарка</h3>
  <form class="form" name="form" @submit.prevent="onSubmit">
    <div class="form-inputs">
      <label for="name">
        <input
            class="form__field form__field_top"
            type="text"
            name="name"
            id="name"
            placeholder="Название"
            v-model="name"
            @blur="bName"
            :disabled="isSubmitting"
        />
      </label>
      <label for="price">
        <input
            class="form__field form__field_middle"
            type="text"
            name="price"
            id="price"
            placeholder="Цена"
            v-model="price"
            @blur="bPrice"
            :disabled="isSubmitting"
        />
      </label>
      <label for="photo">
        <input
            class="form__field form__field_middle"
            type="text"
            name="photo"
            id="photo"
            placeholder="Изображение"
            v-model="photo"
            @blur="bPhoto"
            :disabled="isSubmitting"
        />
      </label>
      <label for="link">
        <input
            class="form__field form__field_bottom"
            type="text"
            name="link"
            id="link"
            placeholder="Ссылка"
            v-model="link"
            @blur="bLink"
            :disabled="isSubmitting"
        />
      </label>
    </div>
    <button
        class="form__button"
        type="submit"
        :disabled="isSubmitting || eName || ePrice || ePhoto || eLink"
    >Отправить</button>

    <div class="message" v-if="eName || ePrice || ePhoto || eLink">
      <h2 class="message__title">Присутствуют ошибки ввода данных:</h2>
      <ul class="message__list">
        <li class="message__text" v-if="eName" >{{eName}}</li>
        <li class="message__text" v-if="ePrice">{{ePrice}}</li>
        <li class="message__text" v-if="ePhoto">{{ePhoto}}</li>
        <li class="message__text" v-if="eLink">{{eLink}}</li>
      </ul>
    </div>
  </form>
</template>

<script>
import {useField, useForm} from "vee-validate";
import * as yup from "yup";

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 100
export default {
  name: "GiftForm",
  props: {onSubmit: { type: Function}, current: {default: null}},
  setup(props) {

    const { handleSubmit, isSubmitting } = useForm()

    const { value: name, errorMessage: eName, handleBlur: bName} = useField(
        'name',
        yup
            .string()
            .trim()
            .required('Пожалуйста, введите название категории')
            .min(NAME_MIN_LENGTH, `Название не может быть короче ${NAME_MIN_LENGTH} символов`)
            .max(NAME_MAX_LENGTH, `Название не может быть длиннее ${NAME_MAX_LENGTH} символов`)
            .matches(/^[-\p{L} _\d]+$/u)
    );

    const { value: price, errorMessage: ePrice, handleBlur: bPrice} = useField(
        'price',
        yup
            .string()
            .trim()
            .required('Пожалуйста, укажите цену подарка')
            .matches(/^\d{1,10}(\.\d{1,2})?$/)
    );

    const { value: photo, errorMessage: ePhoto, handleBlur: bPhoto} = useField(
        'photo',
        yup
            .string()
            .trim()
            .required('Пожалуйста, добавьте ссылку на картинку')
            .url('Ссылка на картинку имеет неверный формат')
    );

    const { value: link, errorMessage: eLink, handleBlur: bLink} = useField(
        'link',
        yup
            .string()
            .trim()
            .required('Пожалуйста, добавьте ссылку на подарок')
            .url('Ссылка на подарок имеет неверный формат')
    );

    if (props.current) {
      name.value = props.current.name;
      price.value = props.current.price;
      photo.value = props.current.photo;
      link.value = props.current.link;
    }

    const onSubmit = handleSubmit(  async values => {
      if (props.current) {
        if (
            props.current.name === values.name &&
            props.current.price === values.price &&
            props.current.photo === values.photo &&
            props.current.link === values.link

        ) {
          return props.onSubmit(null);
        }
        values.id = props.current.id
      }
      return props.onSubmit(values);
    })

    return {
      name, eName, bName,
      price, ePrice, bPrice,
      photo, ePhoto, bPhoto,
      link, eLink,bLink,
      isSubmitting,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>
