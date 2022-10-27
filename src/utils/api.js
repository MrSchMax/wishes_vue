import {errorHandler} from "./error-handler.js";

const API_LINK = import.meta.env.VITE_APP_API_LINK;
const HEADERS = {
    'Content-Type': 'application/json;charset=utf-8'
}

// USER
export const API_USER_SIGNIN = {
    path: '/user/signin.php',
    method: 'POST',
}
export const API_USER_SIGNUP = {
    path: '/user/create.php',
    method: 'POST',
}

// CATEGORY
export const API_CATEGORY_READ_ALL = {
    path: '/category/read_all.php',
    method: 'GET',
}

export const API_CATEGORY_CREATE = {
    path: '/category/create.php',
    method: 'POST',
}

export const API_CATEGORY_DELETE = {
    path: '/category/delete.php',
    method: 'DELETE',
}

export const API_CATEGORY_UPDATE = {
    path: '/category/update.php',
    method: 'PUT',
}

// GIFT
export const API_GIFT_READ_ALL = {
    path: '/gift/read_all.php',
    method: 'GET',
}

export const API_GIFT_CREATE = {
    path: '/gift/create.php',
    method: 'POST',
}

export const API_GIFT_DELETE = {
    path: '/gift/delete.php',
    method: 'DELETE',
}

export const API_GIFT_UPDATE = {
    path: '/gift/update.php',
    method: 'PUT',
}


export async function callApi({path, method, payload, action, token}) {
    try {
        const url = API_LINK + path;
        const headers = {...HEADERS};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(
            url,
            {
                method: method,
                headers,
                body: JSON.stringify(payload)
            }
        )

        const result = await response.json();

        if (response.ok) {
            if (action) action(result)
            return true;
        }
        errorHandler(response.status, result.error)
    }
    catch (e) {
        console.log(e)
        errorHandler();
    }
    return false;
}
