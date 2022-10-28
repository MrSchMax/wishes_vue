<template>
  <preloader v-if="isLoading"/>
  <section v-else class="section section_panel">
    <div class="panel">
      <span class="info">Всего категорий: <span class="info__number">{{gifts.length}}</span></span>
      <button class="button button-create" @click.prevent="create">Создать</button>
    </div>

    <div class="grid">
      <a v-for="gift in gifts" :key="gift.id" :href="gift.link" target="_blank" :class="{hidden: gift.hidden}">
        <article class="card">
          <div class="badge-group">
            <span class="badge">{{gift.price}}&#8381;</span>
          </div>

          <img class="card__image" :src="gift.photo" :alt="gift.name">
          <div class="button-group button-group_card">
            <button class="button button_edit button_color_edit" @click.prevent="update(gift)"></button>
            <button class="button button_remove button_color_remove" @click.prevent="removeAction(gift)"></button>
          </div>
          <div class="card__footer">
            <h2 class="card__title">{{ gift.name }}</h2>
          </div>
        </article>
      </a>

    </div>
  </section>
  <teleport to="body">
    <div class="modal" v-if="modal" @click.self.prevent="modal=false">
      <div class="modal__wrapper">
        <gift-form :on-submit="onSubmit" :current="current"/>
        <span class="button-close" @click.prevent="modal=false">&times;</span>
      </div>
    </div>
  </teleport>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Preloader from "../components/preloader.vue";
import GiftForm from "../components/forms/GiftForm.vue";

export default {
  name: "GiftsVue",
  components: {
    GiftForm,
    Preloader,
  },
  setup() {
    const store = useStore();

    const modal = ref(false);
    const isLoading = ref(false);
    const gifts = computed(() => store.getters['gift/gifts']);

    onMounted(async () => {
      if (!store.getters['gift/alreadyUploaded']) {
        isLoading.value = true;
      }
      await store.dispatch('gift/load');
      isLoading.value = false;
    });

    const current = ref(null);

    const removeAction = async values => {
      values.hidden = true;
      if (!await store.dispatch('gift/delete', values.id)) {values.hidden = false}
    };

    const createAction = async values => await store.dispatch('gift/create', values);
    const updateAction = async values => await store.dispatch('gift/update', values);

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

    return {
      gifts, removeAction, modal, onSubmit, update, create, current, isLoading
    }
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
a {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

.card__footer {
  justify-content: center;
}
</style>
