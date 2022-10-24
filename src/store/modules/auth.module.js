const TOKEN_KEY = import.meta.env.VITE_APP_TOKEN_KEY;
const API_LINK = import.meta.env.VITE_APP_API_LINK;

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
        async login({commit, dispatch}, payload) {
            try {
                const url = API_LINK + '/user/signin.php';
                const response = await fetch(
                    url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(payload)
                    }
                )

                const result = await response.json();

                if (response.ok) {
                    commit('setToken', result.data.jwt);
                    console.log(result);
                    return true;
                }
                console.log(result.error)
            }
            catch (e) {
                console.log(e);
            }
            return false;
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
