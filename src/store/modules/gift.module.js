import {
    API_GIFT_CREATE,
    API_GIFT_DELETE,
    API_GIFT_READ_ALL,
    API_GIFT_UPDATE,
    callApi
} from "../../utils/api.js";
import store from '../index.js'

export default {
    namespaced: true,
    state () {
        return {
            alreadyUploaded: false,
            gifts: []
        }
    },
    mutations: {
        setAlreadyUploaded(state, alreadyUploaded) {
            state.alreadyUploaded = alreadyUploaded;
        },
        setGifts(state, gifts) {
            state.gifts = gifts;
        },
        addGift(state, gift) {
            state.gifts.push(gift);
        },
        deleteGift(state, id) {
            state.gifts = state.gifts.filter(c => c.id !== id);
        },
        updateGift(state, gift) {
            const index = state.gifts.findIndex(c => c.id === gift.id);
            if (~index) {
                state.gifts[index] = gift;
            }
        }
    },
    actions: {
        async load({commit}) {
            return await callApi({
                ...API_GIFT_READ_ALL,
                token: store.getters['auth/token'],
                action: (result) => commit('setGifts', result.data)
            })
        },
        async create({commit}, payload) {
            return await callApi({
                ...API_GIFT_CREATE,
                token: store.getters['auth/token'],
                payload,
                action: (result) => commit('addGift', result.data)
            })
        },
        async update({commit}, payload) {
            return await callApi({
                ...API_GIFT_UPDATE,
                token: store.getters['auth/token'],
                payload,
                action: (result) => commit('updateGift', result.data)
            })
        },
        async delete({commit}, id) {
            return await callApi({
                ...API_GIFT_DELETE,
                token: store.getters['auth/token'],
                payload: {id},
                action: () => commit('deleteGift', id)
            })
        },
    },
    getters: {
        gifts(state) {
            return state.gifts;
        },
        alreadyUploaded(state) {
            return state.alreadyUploaded;
        },
    }
}
