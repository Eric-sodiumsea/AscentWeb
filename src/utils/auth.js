export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function isLogined() {
    if (localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}