import store from "../store/index.js";
import router from "../router/index.js";


const SERVICE_UNAVAILABLE_ERR = 503;
const SERVICE_UNAVAILABLE_MSG = {
    message:  "Сервер недоступен"
};

export function errorHandler(code = SERVICE_UNAVAILABLE_ERR, message = SERVICE_UNAVAILABLE_MSG) {
    if (code === 401) {
        store.commit('auth/logout');
        router.push({name: 'signin'});
    }
    store.dispatch('message/setMessage', {text: message.message, type: 'danger'})
    console.log(code, message);
}
