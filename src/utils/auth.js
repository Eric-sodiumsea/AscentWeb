export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

export function isLogined() {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token'); // userId
    } else {
        return 0;
    }
}