<template>
  <section class="section section_panel">
    <div class="panel">
      <span class="info">Всего наименований в списке: <span class="info__number">{{categories.length}}</span></span>
      <button class="button button-create" @click.prevent="create">Создать</button>
    </div>
    <div class="grid">
      <div class="category" v-for="category in categories" :key="category.id">
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
        <category-form :on-submit="onSubmit" :name="currentName"/>
        <span class="button-close" @click.prevent="modal=false">&times;</span>
      </div>
    </div>
  </teleport>

</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import CategoryForm from "../components/forms/CategoryForm.vue";

export default {
  name: "CategoriesView",
  components: {CategoryForm},
  setup() {
    const store = useStore();

    const modal = ref(false);
    const currentName = ref('');
    onMounted(async () => await store.dispatch('category/load'));

    const categories = computed(() => store.getters['category/categories']);
    const current = computed(() => store.getters['category/current']);

    const removeAction = async values => await store.dispatch('category/delete', values);
    const createAction = async values => await store.dispatch('category/create', values);
    const updateAction = async values => await store.dispatch('category/update', values);

    const submitAction = ref(createAction)


    const onSubmit = async (values) => {
      if (await submitAction.value(values)) {
        modal.value = false;
      }
    }

    const update = async (values) => {
      currentName.value = values.name;
      modal.value = true;
      store.commit('category/setCurrent', values);
      submitAction.value = updateAction;
    }

    const create = async (values) => {
      currentName.value = '';
      modal.value = true;
      return submitAction.value = createAction;
    }

    return {
      categories, removeAction, modal, onSubmit, update, create, currentName, current
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

.modal {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  position: absolute;
  top: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.modal__wrapper {
  background: #F9FAFB;
  width: 100%;
  max-width: 414px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}




</style>
