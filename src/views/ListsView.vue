<template>
  <preloader v-if="isLoading"/>
  <section v-else class="section section_panel">
    <div class="panel">
      <span class="info">Всего списков: <span class="info__number">{{lists.length}}</span></span>
      <button class="button button-create" @click.prevent="create">Создать</button>
    </div>
    <div class="grid">
      <router-link
          v-for="list in lists" :key="list.id"
          :class="{hidden: list.hidden}"
          :to="{name: 'list', params: {id: list.id}}"
      >
        <article class="card">
          <div class="tags-group">
            <span class="tag" v-for="tag in list.categories">{{ tag.name }}</span>
          </div>
          <div class="badge-group">
            <span class="badge">{{list.gifts ? list.gifts.length : 0}}</span>
            <div class="badge-icon"></div>
          </div>

          <img class="card__image" :src="list.gifts && (list.gifts.length > 0) ? list.gifts[0].photo : defaultImg" alt="">
          <div class="button-group button-group_card">
            <button class="button button_edit button_color_edit" @click.prevent="update(list)"></button>
            <button class="button button_remove button_color_remove" @click.prevent="removeAction(list)"></button>
          </div>
          <div class="card__footer">
            <h2 class="card__title">{{ list.name }}</h2>
            <div class="toggle-wrapper" @click.prevent="publicClick(list)">
              <span class="toggle-wrapper__text">Доступен по ссылке: </span>
              <div class="toggle">
                <input
                    class="toggle__invisible"
                    type="checkbox"
                    v-model="list.public"
                />
                <label for="toggle" class="toggle__checkbox"></label>
                <span class="toggle__background"></span>
              </div>
            </div>
          </div>
        </article>
      </router-link>
    </div>
  </section>
  <teleport to="body">
    <div class="modal" v-if="modal" @click.self.prevent="modal=false">
      <div class="modal__wrapper">
        <list-form :on-submit="onSubmit" :current="current"/>
        <span class="button-close" @click.prevent="modal=false">&times;</span>
      </div>
    </div>
  </teleport>
</template>

<script>

import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Preloader from "../components/preloader.vue";
import defaultImg from '../assets/image/img.png';
import ListForm from "../components/forms/ListForm.vue";

export default {
  name: "ListsView",
  components: {
    ListForm,
    Preloader,
  },
  setup() {
    const store = useStore();

    const modal = ref(false);
    const isLoading = ref(false);
    const lists = computed(() => store.getters['list/lists']);


    onMounted(async () => {
      if (!store.getters['list/alreadyUploaded']) {
        isLoading.value = true;
      }
      await store.dispatch('list/load');
      isLoading.value = false;
    });

    const current = ref(null);

    const removeAction = async values => {
      values.hidden = true;
      if (!await store.dispatch('list/delete', values.id)) {values.hidden = false}
    };

    const prepareValues = (values) => {
      const res = {...values};
      res.categories = res.categories ? res.categories.map(it => it.id) : [];
      res.gifts = res.gifts ? res.gifts.map(it => it.id) : [];
      return res;
    }

    const createAction = async values => await store.dispatch('list/create', prepareValues(values));
    const updateAction = async values => await store.dispatch('list/update', prepareValues(values));

    const submitAction = ref(createAction)
    const onSubmit = async (values) => {
      if (values === null || await submitAction.value(values)) {
        modal.value = false;
      }
    }

    const update = async (values) => {
      current.value = values;
      submitAction.value = updateAction;
      modal.value = true;
    }

    const create = async () => {
      current.value = null;
      submitAction.value = createAction;
      modal.value = true;
    }

    const publicClick = async list => {
      const currentValue = list.public;
      list.public = !list.public;
      if (!await updateAction(list)) { list.public = currentValue }
    };

    return {
      lists, removeAction, modal, onSubmit, update, create, current, isLoading, defaultImg, publicClick
    }
  }
}
</script>

<style scoped>

.button_remove:hover,
.button_edit:hover {
  opacity: 0.8;
}
.hidden {
  display: none;
}
a {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.modal__wrapper {
  max-width: 956px;
}
</style>
