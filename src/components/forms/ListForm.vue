<template>
  <h3 class="section__title">Данные списка</h3>
  <preloader v-if="isLoading"/>
  <form class="form" v-else name="form" @submit.prevent="onSubmit">
    <div class="form__inputs">
      <label for="name" >
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
    <div class="form__wrapper form__wrapper_tags" v-show="categories.length > 0">
      <span
          class="tag"
          v-for="category in categories"
          :class="{tag_checked: category.checked}"
          @click.prevent="category.checked = !category.checked"
      >{{category.name}}</span>
    </div>
    <div class="form__wrapper" v-show="gifts.length > 0">
      <div class="grid">
        <div
            class="gift"
            v-for="gift in gifts"
            :class="{gift_selected: gift.checked}"
            @click.prevent="gift.checked = !gift.checked"
        >
          <img class="gift__image" :src="gift.photo" >
          <div class="gift__info">
            <div class="gift__title">{{gift.name}}</div>
            <div class="gift__price">{{gift.price}}&#8381;</div>
          </div>
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
import Preloader from "../preloader.vue";

const LIST_NAME_MIN_LENGTH = 2
const LIST_NAME_MAX_LENGTH = 100

export default {
  name: "ListForm",
  components: {Preloader},
  props: {onSubmit: { type: Function}, current: {default: null}},
  setup(props) {
    const store = useStore();

    const isLoading = ref(false);
    const categories = ref([]);
    const gifts = ref([]);



    onMounted( async () => {
      isLoading.value = true;
      await Promise.all([
          store.dispatch('gift/load'),
          store.dispatch('category/load')
      ])

      if (props.current) {
        value.value = props.current.name;
        isPublic.value = props.current.public;
      }
      const selectedCategories = props.current ? props.current.categories.map(it => it.id) : [];
      const selectedGifts = props.current ? props.current.gifts.map(it => it.id) : [];

      categories.value = store.getters['category/categories'].map(it => {
        it.checked = selectedCategories.includes(it.id);
        return it;
      });
      gifts.value = store.getters['gift/gifts'].map(it => {
        it.checked = selectedGifts.includes(it.id);
        return it;
      });


      isLoading.value = false;
    });

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



    const onSubmit = handleSubmit(  async values => {
      values = {
        ...values,
        public: isPublic.value,
        categories: categories.value.filter(it => it.checked),
        gifts: gifts.value.filter(it => it.checked)
      }
      if (props.current) {
        values.id = props.current.id
      }
      return props.onSubmit(values);
    })

    return {
      value,
      errorMessage,
      handleBlur,
      isPublic,
      categories,
      gifts,
      isSubmitting,
      onSubmit, name,
      isLoading
    }
  }
}
</script>

<style scoped>


label[for="name"] {
  width: 100%;
}
.toggle-wrapper {
  margin: 20px auto 0;
}
.form__wrapper_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.form__inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
