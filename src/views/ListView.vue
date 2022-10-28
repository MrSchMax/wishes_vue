<template>
  <preloader v-if="isLoading"/>
  <not-found v-else-if="!isFound"/>
  <section v-else class="section section_panel">
    <h1 class="section__title">{{list.name}}</h1>
    <div class="tags">
      <span class="tag tag_checked" v-for="tag in list.categories" :key="tag.id">{{ tag.name }}</span>
    </div>
    <div class="grid">
      <a v-for="gift in list.gifts" :key="gift.id" :href="gift.link" target="_blank" :class="{hidden: gift.hidden}">
        <article class="card">
          <div class="badge-group">
            <span class="badge">{{gift.price}}&#8381;</span>
          </div>

          <img class="card__image" :src="gift.photo" :alt="gift.name">

          <div class="card__footer card__footer_gift">
            <h2 class="card__title">{{ gift.name }}</h2>
          </div>
        </article>
      </a>
    </div>
  </section>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import NotFound from "../components/NotFound.vue";
import Preloader from "../components/preloader.vue";
import store from "../store/index.js";



export default {
  name: "ListView",
  components: {Preloader, NotFound},
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(true);
    const isFound = ref(false);
    const list = computed(() => store.getters['list/requested']);

    onMounted(async () => {
      isFound.value = await store.dispatch('list/loadOne', +router.currentRoute.value.params.id);
      isLoading.value = false;
    })


    return {
      isLoading,
      isFound,
      list
    }

  }
}
</script>

<style scoped>

.tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.grid {
  margin-top: 24px;
}
a {
  text-decoration: none;
  display: flex;
  flex-direction: column;
}

</style>
