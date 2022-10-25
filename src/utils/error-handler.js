const SERVICE_UNAVAILABLE_ERR = 503;
const SERVICE_UNAVAILABLE_MSG = {
    server:  "Сервер недоступен"
};

export function errorHandler(code = SERVICE_UNAVAILABLE_ERR, message = SERVICE_UNAVAILABLE_MSG) {
    console.log(code, message);
}
