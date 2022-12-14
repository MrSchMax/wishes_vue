import {API_USER_SIGNIN, API_USER_SIGNUP, callApi} from "../../utils/api.js";


const TOKEN_KEY = import.meta.env.VITE_APP_TOKEN_KEY;

export default {
    namespaced: true,
    state () {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state, token) {
            state.token = null;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    actions: {
        async signin({commit, dispatch}, payload) {
            return await callApi({
                ...API_USER_SIGNIN,
                payload,
                action: (result) => commit('setToken', result.data.jwt)
            })
        },
        async signup({commit, dispatch}, payload) {
            return await callApi({
                ...API_USER_SIGNUP,
                payload,
            })
        },
    },
    getters: {
        token(state) {
            return state.token;
        },
        isAuthenticated(_, getters) {
            return !!getters.token;
        }
    }
}
