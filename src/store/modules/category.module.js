import {
    API_CATEGORY_CREATE,
    API_CATEGORY_DELETE,
    API_CATEGORY_READ_ALL,
    API_CATEGORY_UPDATE,
    callApi
} from "../../utils/api.js";
import store from '../index.js'

export default {
    namespaced: true,
    state () {
        return {
            current: null,
            categories: []
        }
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        addCategory(state, category) {
            state.categories.push(category);
        },
        deleteCategory(state, id) {
            state.categories = state.categories.filter(c => c.id !== id);
        },
        updateCategory(state, category) {
            const index = state.categories.findIndex(c => c.id === category.id);
            if (~index) {
                state.categories[index] = category;
            }
        },
        setCurrent(state, category) {
            state.current = category;
        }
    },
    actions: {
        async load({commit}) {
            return await callApi({
                ...API_CATEGORY_READ_ALL,
                token: store.getters['auth/token'],
                action: (result) => commit('setCategories', result.data)
            })
        },
        async create({commit}, payload) {
            return await callApi({
                ...API_CATEGORY_CREATE,
                token: store.getters['auth/token'],
                payload,
                action: (result) => commit('addCategory', result.data)
            })
        },
        async update({commit}, payload) {
            const id = store.getters['category/current'].id;
            return await callApi({
                ...API_CATEGORY_UPDATE,
                token: store.getters['auth/token'],
                payload: {...payload, id},
                action: (result) => commit('updateCategory', result.data)
            })
        },
        async delete({commit}, payload) {
            return await callApi({
                ...API_CATEGORY_DELETE,
                token: store.getters['auth/token'],
                payload,
                action: () => commit('deleteCategory', payload.id)
            })
        },
    },
    getters: {
        categories(state) {
            return state.categories;
        },
        current(state) {
            return state.current;
        }
    }
}
