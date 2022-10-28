import {
    API_LIST_CREATE,
    API_LIST_DELETE, API_LIST_READ,
    API_LIST_READ_ALL,
    API_LIST_UPDATE,
    callApi
} from "../../utils/api.js";
import store from '../index.js'

export default {
    namespaced: true,
    state () {
        return {
            requested: null,
            alreadyUploaded: false,
            lists: []
        }
    },
    mutations: {
        setAlreadyUploaded(state, alreadyUploaded) {
            state.alreadyUploaded = alreadyUploaded;
        },
        setLists(state, lists) {
            state.lists = lists;
        },
        setRequested(state, list) {
            state.requested = list;
        },
        addList(state, list) {
            state.lists.push(list);
        },
        deleteList(state, id) {
            state.lists = state.lists.filter(c => c.id !== id);
        },
        updateList(state, list) {
            const index = state.lists.findIndex(c => c.id === list.id);
            if (~index) {
                state.lists[index] = list;
            }
        }
    },
    actions: {
        async loadOne({commit}, id) {
            return await callApi({
                ...API_LIST_READ,
                token: store.getters['auth/token'],
                payload: {id},
                action: (result) => {
                    commit('setRequested', result.data);
                }
            })
        },
        async load({commit}) {
            return await callApi({
                ...API_LIST_READ_ALL,
                token: store.getters['auth/token'],
                action: (result) => {
                    commit('setLists', result.data);
                    commit('setAlreadyUploaded', true);
                }
            })
        },
        async create({commit}, payload) {
            return await callApi({
                ...API_LIST_CREATE,
                token: store.getters['auth/token'],
                payload,
                action: (result) => commit('addList', result.data)
            })
        },
        async update({commit}, payload) {
            return await callApi({
                ...API_LIST_UPDATE,
                token: store.getters['auth/token'],
                payload,
                action: (result) => commit('updateList', result.data)
            })
        },
        async delete({commit}, id) {
            return await callApi({
                ...API_LIST_DELETE,
                token: store.getters['auth/token'],
                payload: {id},
                action: () => commit('deleteList', id)
            })
        },
    },
    getters: {
        lists(state) {
            return state.lists;
        },
        alreadyUploaded(state) {
            return state.alreadyUploaded;
        },
        requested(state) {
            return state.requested;
        },
    }
}
