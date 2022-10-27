<template>
  <preloader v-if="isLoading"/>
  <section v-else class="section section_panel">
    <div class="panel">
      <span class="info">Всего подарков: <span class="info__number">{{categories.length}}</span></span>
      <button class="button button-create" @click.prevent="create">Создать</button>
    </div>
    <div class="grid">
      <div class="category" v-for="category in categories" :key="category.id" :class="{hidden: category.hidden}">
        <p class="category__title">{{category.name}}</p>
        <div class="button-group">
          <button class="button button_edit" @click.prevent="update(category)"></button>
          <button class="button button_remove" @click.prevent="removeAction(category)"></button>
        </div>
      </div>
    </div>
  </section>
  <teleport to="body">
    <div class="modal" v-if="modal" @click.self.prevent="modal=false">
      <div class="modal__wrapper">
        <category-form :on-submit="onSubmit" :current="current"/>
        <span class="button-close" @click.prevent="modal=false">&times;</span>
      </div>
    </div>
  </teleport>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import CategoryForm from "../components/forms/CategoryForm.vue";
import Preloader from "../components/preloader.vue";

export default {
  name: "CategoriesView",
  components: {Preloader, CategoryForm},
  setup() {
    const store = useStore();

    const modal = ref(false);
    const isLoading = ref(false);
    const categories = computed(() => store.getters['category/categories']);

    onMounted(async () => {
      if (!store.getters['category/alreadyUploaded']) {
        isLoading.value = true;
      }
      await store.dispatch('category/load');
      isLoading.value = false;
      !store.commit('category/setAlreadyUploaded', true);
    });

    const current = ref(null);

    const removeAction = async values => {
      values.hidden = true;
      if (!await store.dispatch('category/delete', values.id)) {values.hidden = false}
    };

    const createAction = async values => await store.dispatch('category/create', values);
    const updateAction = async values => await store.dispatch('category/update', values);

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
      categories, removeAction, modal, onSubmit, update, create, current, isLoading
    }
  }
}
</script>

<style scoped>
.category {
  width: 280px;
  height: 36px;
  background: #4F46E5;
  border-radius: 6px;
  padding: 8px 0 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.category__title {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0;
}
.button-group {
  gap: 0;
}
.button_edit, .button_remove {
  border-radius: 0;
}

.button:hover {
  opacity: 1;
}
.hidden {
  display: none;
}
</style>
