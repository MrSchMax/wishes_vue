import {errorHandler} from "./error-handler.js";

const API_LINK = import.meta.env.VITE_APP_API_LINK;

export const API_USER_SIGNIN = {
    path: '/user/signin.php',
    method: 'POST',
}
export const API_USER_SIGNUP = {
    path: '/user/signup.php',
    method: 'POST',
}

export async function callApi({path, method, payload, action}) {
    try {
        const url = API_LINK + path;
        const response = await fetch(
            url,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            }
        )

        const result = await response.json();

        if (response.ok) {
            action(result)
            return true;
        }
        errorHandler(response.status, result.error)
    }
    catch (e) {
        errorHandler();
    }
    return false;
}
